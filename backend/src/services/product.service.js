import { productRepository } from '../repositories/product.repository.js';
import { AppError } from '../utils/AppError.js';

export const productService = {
  async list(query) {
    const page = Math.max(Number(query.page || 1), 1);
    const limit = Math.min(Math.max(Number(query.limit || 10), 1), 100);
    const sortBy = ['name', 'sku', 'category', 'price', 'currentStock', 'createdAt'].includes(query.sortBy) ? query.sortBy : 'createdAt';
    const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';
    const [items, total] = await productRepository.list({
      search: query.search,
      category: query.category,
      skip: (page - 1) * limit,
      take: limit,
      sortBy,
      sortOrder
    });
    return { items, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  },
  async create(data, user, file) {
    const existing = await productRepository.findBySku(data.sku);
    if (existing) throw new AppError('SKU must be unique.', 409);
    if (Number(data.currentStock) < 0) throw new AppError('Stock cannot be negative.', 400);
    return productRepository.create({
      name: data.name,
      sku: data.sku,
      description: data.description,
      category: data.category,
      price: data.price,
      currentStock: Number(data.currentStock || 0),
      imageUrl: file ? `/uploads/${file.filename}` : data.imageUrl,
      createdById: user.id
    });
  },
  async update(id, data, file) {
    const product = await productRepository.findRawById(id);
    if (!product) throw new AppError('Product not found.', 404);
    if (data.sku && data.sku !== product.sku) {
      const existing = await productRepository.findBySku(data.sku);
      if (existing) throw new AppError('SKU must be unique.', 409);
    }
    if (data.currentStock !== undefined && Number(data.currentStock) < 0) throw new AppError('Stock cannot be negative.', 400);
    return productRepository.update(id, { ...data, ...(file ? { imageUrl: `/uploads/${file.filename}` } : {}) });
  },
  async get(id) {
    const product = await productRepository.findById(id);
    if (!product) throw new AppError('Product not found.', 404);
    return product;
  },
  async remove(id) {
    await this.get(id);
    await productRepository.delete(id);
  }
};
