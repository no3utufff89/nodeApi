import { Router } from 'express';
import categoryController from '../controllers/categoryController.js';

const categoryRouter = new Router();
categoryRouter.post('/', categoryController.createCategory);
categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/:id', categoryController.getCategory);
categoryRouter.delete('/:id', categoryController.deleteCategory);

export default categoryRouter;
