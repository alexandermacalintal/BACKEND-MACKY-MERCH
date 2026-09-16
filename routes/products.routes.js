import {Router} from 'express';

import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/products.controller.js';

import {validateProduct,validateProductUpdate} from '../middlewares/validateProduct.js';

const productRouter = Router();

productRouter.post('/', validateProduct, createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.put('/:id', validateProductUpdate, updateProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;