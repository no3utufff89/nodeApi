import { readFile, writeFile } from 'node:fs/promises';

export const readData = async dataFileName => {
    try {
        const data = await readFile(dataFileName);

        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading categories:', error);
    }
};

export const writeData = async (dataFileName, newData) => {
    const existingData = await readData(dataFileName);
    if (!existingData || !Array.isArray(existingData)) existingData = [];
    existingData.push(newData);
    await writeFile(dataFileName, JSON.stringify(existingData, null, 2));
    console.log(`existingData`, existingData);
};
