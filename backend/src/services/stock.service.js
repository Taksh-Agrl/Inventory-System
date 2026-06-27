import { prisma } from '../database/prisma.js';
import { AppError } from '../utils/AppError.js';

const applyMovement = async (tx, { productId, difference, movementType, userId, orderId = null, note = null }) => {
  const product = await tx.product.findUnique({ where: { id: productId } });
  if (!product) throw new AppError('Product not found.', 404);
  const oldQuantity = product.currentStock;
  const newQuantity = oldQuantity + difference;
  if (newQuantity < 0) throw new AppError(`Insufficient stock for ${product.name}.`, 400);
  await tx.product.update({ where: { id: productId }, data: { currentStock: newQuantity } });
  return tx.stockHistory.create({
    data: { productId, oldQuantity, newQuantity, difference, movementType, orderId, userId, note },
    include: { product: true, user: { select: { id: true, name: true } } }
  });
};

export const stockService = {
  applyMovement,
  adjust({ productId, quantity, movementType, note }, user) {
    const amount = Number(quantity);
    if (!Number.isInteger(amount) || amount <= 0) throw new AppError('Quantity must be a positive integer.', 422);
    const diff = movementType === 'REMOVE' ? -amount : amount;
    return prisma.$transaction((tx) => applyMovement(tx, { productId, difference: diff, movementType, userId: user.id, note }));
  },
  setAbsolute({ productId, newQuantity, note }, user) {
    return prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({ where: { id: productId } });
      if (!product) throw new AppError('Product not found.', 404);
      const target = Number(newQuantity);
      if (!Number.isInteger(target) || target < 0) throw new AppError('New quantity must be zero or greater.', 422);
      return applyMovement(tx, {
        productId,
        difference: target - product.currentStock,
        movementType: 'ADJUST',
        userId: user.id,
        note
      });
    });
  },
  async history(query) {
    const page = Math.max(Number(query.page || 1), 1);
    const limit = Math.min(Math.max(Number(query.limit || 15), 1), 100);
    const where = {
      ...(query.productId ? { productId: Number(query.productId) } : {}),
      ...(query.movementType ? { movementType: query.movementType } : {})
    };
    const [items, total] = await Promise.all([
      prisma.stockHistory.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { product: true, user: { select: { id: true, name: true } }, order: true }
      }),
      prisma.stockHistory.count({ where })
    ]);
    return { items, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  }
};
