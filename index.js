import cors from 'cors';
import express from 'express';
import router from './routes/rootRouter.js';
import fileUpload from 'express-fileupload';

import { createInitialDataFiles } from './exceptions/fileFunction.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static('img'));
app.use(fileUpload({}));
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    createInitialDataFiles();
});
