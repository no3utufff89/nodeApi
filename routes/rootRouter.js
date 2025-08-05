import { Router } from 'express';
import path from 'path';
import categoryRouter from './categoryRouter.js';

const router = new Router();

router.get('/documentation', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'pages/docs', 'index.html'));
});
router.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'pages', 'index.html'));
});
router.use('/categories', categoryRouter);
export default router;
