import productService from '../services/productService.js';

class ProductController {
    async createProduct(req, res, next) {
        try {
            if (!req.body.title) {
                return res.status(400).json({ error: 'Missing required data in the request' });
            }

            const result = await productService.createProduct(req.body);
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getProduct(req, res, next) {
        try {
            const id = req.params.id;

            const result = await productService.getProduct(id);
            if (!result) {
                return res.status(400).json({ message: 'No such product' });
            }
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async deleteProduct(req, res, next) {
        const result = await productService.deleteProduct(req.params.id);

        return res.json(result);
    }

    async getProductsInCategory(req, res, next) {}
}
export default new ProductController();
