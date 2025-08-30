import userService from '../services/userService.js';

class UserController {
    async registration(req, res, next) {
        try {
            if (!req.body.login) {
                return res.status(400).json({ error: 'Missing required data in the request' });
            }
            const result = await userService.registration(req.body);
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            if (!req.body.login) {
                return res.status(400).json({ error: 'Missing required data in the request' });
            }
            const result = await userService.login(req.body);
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }
}
export default new UserController();
