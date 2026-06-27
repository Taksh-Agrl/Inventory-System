import { prisma } from '../database/prisma.js';

export const dashboardService = {
  async summary() {
    const [totalProducts, lowStock, totalOrders, cancelledOrders, revenueAgg, recentOrders, recentStockActivities, byCategory, byStatus] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { currentStock: { lte: 10 } } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: 'CANCELLED' } }),
      prisma.order.aggregate({ where: { status: { not: 'CANCELLED' } }, _sum: { total: true } }),
      prisma.order.findMany({ take: 6, orderBy: { createdAt: 'desc' }, include: { items: true } }),
      prisma.stockHistory.findMany({ take: 8, orderBy: { createdAt: 'desc' }, include: { product: true, user: { select: { name: true } } } }),
      prisma.product.groupBy({ by: ['category'], _count: { category: true } }),
      prisma.order.groupBy({ by: ['status'], _count: { status: true } })
    ]);

    const now = new Date();
    const monthlyRevenue = await Promise.all(Array.from({ length: 6 }).map(async (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
      const next = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      const value = await prisma.order.aggregate({
        where: { status: { not: 'CANCELLED' }, createdAt: { gte: date, lt: next } },
        _sum: { total: true }
      });
      return { month: date.toLocaleString('en', { month: 'short' }), revenue: Number(value._sum.total || 0) };
    }));

    return {
      totals: {
        totalProducts,
        lowStock,
        totalOrders,
        cancelledOrders,
        revenue: Number(revenueAgg._sum.total || 0)
      },
      recentOrders,
      recentStockActivities,
      charts: {
        monthlyRevenue,
        categoryMix: byCategory.map((item) => ({ name: item.category, value: item._count.category })),
        orderStatus: byStatus.map((item) => ({ name: item.status, value: item._count.status }))
      }
    };
  }
};
