import app from '../app.js';
import request from 'supertest';
import {describe, it, expect} from 'vitest';

describe('Product API', () => {
  it('should return 201 and create a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      price: 19.99,
      stock: 100,
      category: 'Test Category',
      sku: 'TESTSKU123',
      size: 'M'
    };

    const response = await request(app)
      .post('/api/products')
      .send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newProduct.name);
  });

  it('should return 400 for incomplete product data', async () => {
    const res = await request(app).post('/api/products').send({ name: 'Incomplete Product' });
    expect(res.status).toBe(400);
  });

  it('should return 200 and retrieve all products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return 200 and retrieve a product by ID', async () => {
    const newProduct = {
      name: 'Test Product 2',
      price: 29.99,
      stock: 50,
      category: 'Test Category 2',
      sku: 'TESTSKU456',
      size: 'L'
    };

    const createResponse = await request(app)
      .post('/api/products')
      .send(newProduct);

    const productId = createResponse.body.id;

    const response = await request(app).get(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(newProduct.name);
  });
  
  it('should return 200 and update a product', async () => {
    const newProduct = {
      name: 'Test Product 3',
      price: 39.99,
      stock: 30,
      category: 'Test Category 3',
      sku: 'TESTSKU789',
      size: 'S'
    };

    const createResponse = await request(app)
      .post('/api/products')
      .send(newProduct);

    const productId = createResponse.body.id;

    const updatedProduct = {
      name: 'Updated Test Product 3',
      price: 49.99,
      stock: 20,
      category: 'Updated Test Category 3',
      sku: 'UPDATEDSKU789',
      size: 'XL'
    };

    const response = await request(app)
      .put(`/api/products/${productId}`)
      .send(updatedProduct);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedProduct.name);
  });

  it('should return 200 and delete a product', async () => {
    const newProduct = {
      name: 'Test Product 4',
      price: 59.99,
      stock: 10,
      category: 'Test Category 4',
      sku: 'TESTSKU101112',
      size: 'XXL'
    };

    const createResponse = await request(app)
      .post('/api/products')
      .send(newProduct);

    const productId = createResponse.body.id;

    const response = await request(app).delete(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product deleted successfully');
  });
});