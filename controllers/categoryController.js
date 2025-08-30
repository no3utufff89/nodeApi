import categoryService from '../services/categoryService.js';
class CategoryController {
    async createCategory(req, res, next) {
        try {
            if (!req.body.title) {
                return res.status(400).json({ error: 'Missing required data in the request' });
            }
            if (req.files === null) {
                const result = await categoryService.createCategory(req.body, null);
                return res.json(result);
            }
            const result = await categoryService.createCategory(req.body, req.files.image);
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
    async deleteCategory(req, res, next) {
        const result = await categoryService.deleteCategory(req.params.id);

        return res.json(result);
    }
}
export default new CategoryController();
