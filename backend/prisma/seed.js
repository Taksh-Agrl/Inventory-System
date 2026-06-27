import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const passwordHash = await bcrypt.hash('Admin1234', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@inventory.local' },
    update: {},
    create: { name: 'Admin User', email: 'admin@inventory.local', passwordHash, role: 'ADMIN' }
  });

  const products = [
    { name: 'USB-C Dock Pro', sku: 'DOCK-USB-C-PRO', category: 'Electronics', price: 129.99, currentStock: 42 },
    { name: 'Thermal Label Roll', sku: 'LBL-THERM-4X6', category: 'Packaging', price: 18.5, currentStock: 140 },
    { name: 'Ergo Office Chair', sku: 'FURN-ERG-CHAIR', category: 'Furniture', price: 249.0, currentStock: 8 }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: product,
      create: { ...product, createdById: admin.id }
    });
  }
};

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
