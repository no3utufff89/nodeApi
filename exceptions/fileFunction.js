import * as path from 'path';
import * as fs from 'fs';
import { DB_FOLDER, initialDataFiles } from '../constants.js';
const targetFolder = DB_FOLDER; // Папка, куда будем записывать
function findFile(startPath) {
    const notExistingFiles = [];
    const targetPath = path.join(targetFolder, startPath);

    fs.access(targetPath, fs.constants.F_OK, err => {
        if (err) {
            notExistingFiles.push(targetPath);
        } else {
        }
        const dataArr = [];
        const jsonString = JSON.stringify(dataArr);

        notExistingFiles.map(file => {
            fs.writeFile(file, jsonString, err => {
                if (err) {
                    console.error('Error writing JSON file:', err);
                } else {
                    console.log(`${startPath} created successfully with an empty array.`);
                }
            });
        });
    });
}
function createDbFolder() {
    // Создание папки, если она не существует
    fs.mkdirSync(targetFolder, { recursive: true }, err => {
        if (err) throw err;
        console.log(`Папка "${targetFolder}" успешно создана!`);
    });
}
export const createInitialDataFiles = () => {
    const dataFiles = initialDataFiles;

    createDbFolder();
    for (let i = 0; i < dataFiles.length; i++) {
        findFile(dataFiles[i]);
    }
};
