import { prisma } from '../database/prisma.js';
import { stockService } from './stock.service.js';
import { AppError } from '../utils/AppError.js';

const orderInclude = {
  user: { select: { id: true, name: true } },
  items: { include: { product: true } }
};

export const orderService = {
  async create(data, user) {
    if (!data.items?.length) throw new AppError('Order must contain at least one item.', 422);
    return prisma.$transaction(async (tx) => {
      const productIds = data.items.map((item) => item.productId);
      const products = await tx.product.findMany({ where: { id: { in: productIds } } });
      const productMap = new Map(products.map((product) => [product.id, product]));
      let total = 0;

      for (const item of data.items) {
        const product = productMap.get(item.productId);
        if (!product) throw new AppError(`Product ${item.productId} not found.`, 404);
        if (product.currentStock < item.quantity) throw new AppError(`Insufficient stock for ${product.name}.`, 400);
        total += Number(product.price) * item.quantity;
      }

      const order = await tx.order.create({
        data: {
          orderNo: `ORD-${Date.now()}`,
          customer: data.customer,
          userId: user.id,
          total,
          items: {
            create: data.items.map((item) => {
              const product = productMap.get(item.productId);
              const unitPrice = Number(product.price);
              return { productId: item.productId, quantity: item.quantity, unitPrice, lineTotal: unitPrice * item.quantity };
            })
          }
        },
        include: orderInclude
      });

      for (const item of data.items) {
        await stockService.applyMovement(tx, {
          productId: item.productId,
          difference: -item.quantity,
          movementType: 'ORDER',
          orderId: order.id,
          userId: user.id,
          note: `Order ${order.orderNo}`
        });
      }
      return tx.order.findUnique({ where: { id: order.id }, include: orderInclude });
    });
  },
  async update(id, data) {
    const order = await prisma.order.findUnique({ where: { id }, include: orderInclude });
    if (!order) throw new AppError('Order not found.', 404);
    if (order.status === 'CANCELLED') throw new AppError('Cancelled orders cannot be edited.', 400);
    return prisma.order.update({ where: { id }, data: { customer: data.customer ?? order.customer }, include: orderInclude });
  },
  async cancel(id, user) {
    return prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({ where: { id }, include: { items: true } });
      if (!order) throw new AppError('Order not found.', 404);
      if (order.status === 'CANCELLED') throw new AppError('Order is already cancelled.', 400);
      await tx.order.update({ where: { id }, data: { status: 'CANCELLED' } });
      for (const item of order.items) {
        await stockService.applyMovement(tx, {
          productId: item.productId,
          difference: item.quantity,
          movementType: 'CANCEL',
          orderId: order.id,
          userId: user.id,
          note: `Cancelled ${order.orderNo}`
        });
      }
      return tx.order.findUnique({ where: { id }, include: orderInclude });
    });
  },
  async list(query) {
    const page = Math.max(Number(query.page || 1), 1);
    const limit = Math.min(Math.max(Number(query.limit || 10), 1), 100);
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.search ? { OR: [{ orderNo: { contains: query.search } }, { customer: { contains: query.search } }] } : {})
    };
    const [items, total] = await Promise.all([
      prisma.order.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: 'desc' }, include: orderInclude }),
      prisma.order.count({ where })
    ]);
    return { items, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  },
  async get(id) {
    const order = await prisma.order.findUnique({ where: { id }, include: orderInclude });
    if (!order) throw new AppError('Order not found.', 404);
    return order;
  }
};
