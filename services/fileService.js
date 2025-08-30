import * as uuid from 'uuid';
import * as path from 'path';
import ApiError from '../exceptions/errorHandler.js';
class FileService {
    saveFile(file, dest, type) {
        if (!file) return;
        let fileExt, targetFolder;

        switch (type) {
            case 'category':
                targetFolder = dest;
                break;
            case 'products':
                targetFolder = dest;
                break;
            case 'icons':
                targetFolder = dest;
                break;
            default:
                break;
        }
        fileExt = file.name.split('.').reverse()[0];
        const name = uuid.v4() + '.' + fileExt;
        const types = ['image/png', 'image/jpg', 'image/jpeg'];

        try {
            if (types.includes(file.mimetype)) {
                const filePath = path.resolve(`img/${targetFolder}`, name);
                file.mv(filePath);

                return name;
            } else {
                return ApiError.internal('Invalid file format');
            }
        } catch (error) {
            console.log(`Error in file upload`, error);
        }
    }
}
export default new FileService();
