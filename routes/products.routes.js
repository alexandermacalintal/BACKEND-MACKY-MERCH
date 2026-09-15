import {Router} from 'express';

import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';

const productRouter = Router();

productRouter.post('/', (req, res) => {
  // Handle product creation logic here
  res.send({title: 'Product created successfully'});

});

productRouter.get('/', (req, res) => {
  // Handle fetching all products logic here
  res.send({title:'List of products'});
});

productRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  // Handle fetching a specific product by ID logic here
  res.send({title: `Details of product with ID: ${id}`});
});

productRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  // Handle updating a specific product by ID logic here
  res.send({title: `Product with ID: ${id} updated successfully`});
});

productRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  // Handle deleting a specific product by ID logic here
  res.send({title: `Product with ID: ${id} deleted successfully`});
});

export default productRouter;