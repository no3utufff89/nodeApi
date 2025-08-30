import { Router } from 'express';
import productController from '../controllers/productController.js';

const productRouter = new Router();
productRouter.post('/', productController.createProduct);
productRouter.get('/:id', productController.getProduct);
productRouter.delete('/:id', productController.deleteProduct);
export default productRouter;
