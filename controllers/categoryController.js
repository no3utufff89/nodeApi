import categoryService from '../services/categoryService.js';

class CategoryController {
    async createCategory(req, res, next) {
        try {
            const { title, description } = req.body;
            if (!title) {
                return res.status(400).json({ error: 'Missing required data in the request' });
            }
            const result = await categoryService.createCategory(title, description);
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAllCategories(req, res, next) {
        try {
            const result = await categoryService.getAllCategories();
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getCategory(req, res, next) {
        try {
            const id = req.params.id;

            const result = await categoryService.getCategory(id);
            if (!result) {
                return res.status(400).json({ message: 'No such category' });
            }
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }
}
export default new CategoryController();
