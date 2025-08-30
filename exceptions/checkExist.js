import { readData } from './loadData.js';

export const checkExist = async (title, sourceFile) => {
    let exist;
    const data = await readData(sourceFile);
    return data.find(item => item.title === title) ? (exist = true) : (exist = false);
};
export const checkUserExist = async (login, sourceFile) => {
    let exist;
    const data = await readData(sourceFile);
    exist = data.find(item => item.login === login) ? (exist = true) : (exist = false);
    return {
        exist: exist,
        data: await data.find(item => item.login === login),
    };
};
