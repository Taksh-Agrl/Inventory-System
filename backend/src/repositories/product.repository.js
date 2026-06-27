import { prisma } from '../database/prisma.js';

const productSelect = {
  id: true,
  name: true,
  sku: true,
  description: true,
  category: true,
  price: true,
  currentStock: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
  createdBy: { select: { id: true, name: true, email: true } }
};

export const productRepository = {
  list: ({ search, category, skip, take, sortBy, sortOrder }) => {
    const where = {
      ...(category ? { category } : {}),
      ...(search ? {
        OR: [
          { name: { contains: search } },
          { sku: { contains: search } },
          { category: { contains: search } }
        ]
      } : {})
    };
    return Promise.all([
      prisma.product.findMany({ where, skip, take, orderBy: { [sortBy]: sortOrder }, select: productSelect }),
      prisma.product.count({ where })
    ]);
  },
  findById: (id) => prisma.product.findUnique({ where: { id }, select: productSelect }),
  findRawById: (id, tx = prisma) => tx.product.findUnique({ where: { id } }),
  findBySku: (sku) => prisma.product.findUnique({ where: { sku } }),
  create: (data) => prisma.product.create({ data, select: productSelect }),
  update: (id, data) => prisma.product.update({ where: { id }, data, select: productSelect }),
  delete: (id) => prisma.product.delete({ where: { id } })
};
