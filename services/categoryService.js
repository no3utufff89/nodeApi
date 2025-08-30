import { CONSTANTS } from '../constants.js';
import { checkExist } from '../exceptions/checkExist.js';
import ApiError from '../exceptions/errorHandler.js';
import { readData, writeData } from '../exceptions/loadData.js';
import fileService from './fileService.js';
import { writeFile } from 'node:fs/promises';

class CategoryService {
    constructor() {
        this.dataFileName = CONSTANTS.DB_FILES.CATEGORIES_FILE;
        this.imageFolder = CONSTANTS.IMAGES.CATEGORIES;
        this.type = 'category';
    }
    async createCategory({ title, description }, categoryImage) {
        let imageName;
        description.trim();
        if (!description) {
            description = 'Category with test description';
        }

        const exist = await checkExist(title, this.dataFileName);
        if (exist) {
            return ApiError.badRequest('Category with this name already exists');
        }
        if (categoryImage === null) {
            imageName = 'No-image';
        } else {
            const name = fileService.saveFile(categoryImage, this.imageFolder, this.type);

            imageName = name;
        }
        const categoryId = Date.now();
        const newCategory = {
            id: categoryId.toString(),
            title: title.trim(),
            description: description,
            image: imageName,
        };
        writeData(this.dataFileName, newCategory);
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
    async deleteCategory(id) {
        const data = await readData(this.dataFileName);
        if (!id) {
            return ApiError.badRequest('No category id in request');
        }
        const filtredData = data.filter(n => n.id !== id);
        const newData = [];
        newData.push(filtredData);
        await writeFile(this.dataFileName, JSON.stringify(newData.flat(), null, 2));
    }
}
export default new CategoryService();
