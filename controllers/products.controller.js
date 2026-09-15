import db from '../db.js';

export const createProduct = (req, res, next) => {
  try {
    const { name, price, stock, category, sku, size } = req.body;
    const stmt = db.prepare('INSERT INTO products (name, price, stock, category, sku, size) VALUES (?, ?, ?, ?, ?, ?)');
    const result = stmt.run(name, price, stock, category, sku, size);
    const newProduct = { id: result.lastInsertRowid, name, price, stock, category, sku, size };
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = (req, res, next) => {
  try {
    const stmt = db.prepare('SELECT * FROM products');
    const products = stmt.all();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = (req, res, next) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
    const product = stmt.get(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, stock, category, sku, size } = req.body;

    const stmt = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!stmt) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updateStmt = db.prepare('UPDATE products SET name = ?, price = ?, stock = ?, category = ?, sku = ?, size = ? WHERE id = ?');
    updateStmt.run(name, price, stock, category, sku, size, id);

    const updatedProduct = { id: parseInt(id), name, price, stock, category, sku, size };
    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = (req, res, next) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!stmt) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const deleteStmt = db.prepare('DELETE FROM products WHERE id = ?');
    deleteStmt.run(id);

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};