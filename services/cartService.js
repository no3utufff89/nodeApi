import { CONSTANTS } from '../constants.js';
import ApiError from '../exceptions/errorHandler.js';
import { generateRandom } from '../exceptions/generateRandom.js';
import { writeData } from '../exceptions/loadData.js';
class CartService {
    constructor() {
        this.dataFileName = CONSTANTS.DB_FILES.CARTS_FILE;
    }
    async createCart(userId) {
        if (!userId) return ApiError.badRequest('Missing required fileds');

        const newCart = {
            id: generateRandom(),
            userId: userId,
            products: [],
        };
        await writeData(this.dataFileName, newCart);
        return newCart.id;
    }
}
export default new CartService();
