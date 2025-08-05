import { CONSTANTS } from '../constants.js';
import { checkExist } from '../exceptions/checkExist.js';
import ApiError from '../exceptions/errorHandler.js';
import { readData, writeData } from '../exceptions/loadData.js';

class CategoryService {
    constructor() {
        this.dataFileName = CONSTANTS.FILES.CATEGORIES_FILE;
    }
    async createCategory(title, description) {
        description.trim();
        if (!description) {
            description = 'Category with test description';
        }

        const exist = await checkExist(title, this.dataFileName);
        if (exist) {
            return ApiError.badRequest('Category with this name already exists');
        } else {
            const categoryId = Date.now();
            const newCategory = {
                id: categoryId.toString(),
                title: title.trim(),
                description: description,
            };
            writeData(this.dataFileName, newCategory);
        }
    }

    async getAllCategories() {
        const data = await readData(this.dataFileName);
        let allCategories = [];
        allCategories.push(data.map(item => item.title));
        return allCategories.flat();
    }
    async getCategory(id) {
        const data = await readData(this.dataFileName);
        if (!id) {
            return ApiError.badRequest('No category id in request');
        }
        const target = data.find(category => category.id === id);
        return target;
    }
}
export default new CategoryService();
