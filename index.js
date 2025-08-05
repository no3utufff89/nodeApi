import cors from 'cors';
import express from 'express';
import { readFile, writeFile } from 'node:fs/promises';
import router from './routes/rootRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/img', express.static('img'));
app.use('/api', router);
//create category

// app.post('/api/categories', async (req, res) => {
//     const { title } = req.body;
//     if (!title) {
//         return res.status(400).json({ error: 'Missing required data in the request' });
//     }
//     let categories = [];
//     try {
//         const categoriesData = await readFile('categories.json');
//         categories = JSON.parse(categoriesData);
//     } catch (error) {
//         console.error('Error reading categories:', error);
//     }
//     const categoryId = Date.now();
//     const newCategory = {
//         id: categoryId,
//         title: title.trim(),
//     };
//     categories.push(newCategory);
//     try {
//         await writeFile('categories.json', JSON.stringify(categories, null, 2));
//         res.status(201).json({ message: 'Order created successfully', categoryId });
//     } catch (error) {
//         console.error('Error writing orders:', error);
//         res.status(500).json({ error: 'Failed to create order' });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
