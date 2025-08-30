import bcrypt from 'bcryptjs';
import { CONSTANTS } from '../constants.js';
import { checkUserExist } from '../exceptions/checkExist.js';
import ApiError from '../exceptions/errorHandler.js';
import { writeData } from '../exceptions/loadData.js';
import UserModel from '../models/userModel.js';
import UserDto from '../dtos/user-dto.js';
import cartService from './cartService.js';

class UserService {
    constructor() {
        this.dataFileName = CONSTANTS.DB_FILES.USERS_FILE;
        this.imageFolder = CONSTANTS.IMAGES.USERS;
        this.type = 'users';
    }
    async registration({ login, password, email }) {
        if (!login || !password) {
            return ApiError.badRequest('Missing required fileds');
        }
        const user = await checkUserExist(login, this.dataFileName);

        if (user.exist) {
            return ApiError.badRequest('User already exists', {
                loginError: 'User already exists',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const userId = Date.now();
        const cartId = await cartService.createCart(userId);

        const newUser = {
            id: userId.toString(),
            login: login.trim(),
            password: hashedPassword,
            email: email,
            cart: cartId,
        };
        const newUserData = new UserModel(newUser);

        await writeData(this.dataFileName, newUserData);
        return {
            message: 'User created',
            status: 200,
        };
    }

    async login({ login, password }) {
        if (!login || !password) {
            return ApiError.badRequest('Missing required fileds');
        }
        const user = await checkUserExist(login, this.dataFileName);

        if (!user.data) {
            return ApiError.badRequest('No such user', {
                loginError: 'No such user',
            });
        }
        //Проверяем пароль
        const isPasswordValid = await bcrypt.compare(password, user.data.password);
        //Если пароли не совпадают -> Ошибка
        if (!isPasswordValid) {
            return ApiError.badRequest('Invalid password', {
                passwordError: 'Invalid password',
            });
        }
        const userData = new UserDto(user.data);

        return {
            status: 200,
            message: 'login successful',
            userData: userData,
        };
    }
}
export default new UserService();
