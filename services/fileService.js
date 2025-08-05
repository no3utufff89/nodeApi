import multer from 'multer';

class FileService {
    constructor() {
        this.upload = multer({ dest: 'img/' });
    }
    saveFile(file) {
        if (!title) return;

        try {
            this.upload.single(file);
        } catch (error) {
            console.log(`error in MULTER`, error);
        }
    }
}
export default new FileService();
