import { CONSTANTS } from '../constants.js';
import { readData, writeData } from '../exceptions/loadData.js';
import { writeFile } from 'node:fs/promises';

class ProductService {
    constructor() {
        this.dataFileName = CONSTANTS.DB_FILES.PRODUCTS_FILE;
        this.imageFolder = CONSTANTS.IMAGES.PRODUCTS;
        this.type = 'products';
    }

    async createProduct(data) {
        const productId = Date.now();
        const newProduct = {
            id: productId.toString(),
            title: data.title,
            description: data.description,
            price: data.price,
            image: 'No-image',
            category: data.category,
            discount: data.discount,
            count: data.count,
            units: data.units,
        };

        await writeData(this.dataFileName, newProduct);
    }
    async getProduct(id) {
        const data = await readData(this.dataFileName);
        if (!id) {
            return ApiError.badRequest('No product id in request');
        }
        const target = data.find(product => product.id === id);
        return target;
    }
    async deleteProduct(id) {
        const data = await readData(this.dataFileName);
        if (!id) {
            return ApiError.badRequest('No product id in request');
        }
        const filtredData = data.filter(n => n.id !== id);
        const newData = [];
        newData.push(filtredData);
        await writeFile(this.dataFileName, JSON.stringify(newData.flat(), null, 2));
    }
}
export default new ProductService();
