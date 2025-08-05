import { readData } from './loadData.js';

export const checkExist = async (title, sourceFile) => {
    let exist;
    const data = await readData(sourceFile);
    return data.find(item => item.title === title) ? (exist = true) : (exist = false);
};
