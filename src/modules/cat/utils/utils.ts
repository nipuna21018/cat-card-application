import { Interface } from "readline";

const fs = require('fs');

export const saveImageToFile = (buffer: any, filePath: string): Promise<boolean> =>
    new Promise<boolean>((resolve, reject) => {
        fs.writeFile(filePath, buffer, 'binary', (err: any) => {
            if (err) {
                reject(err);
            } else {
                console.log('The file was saved!');
                resolve(true);
            }
        });
    });


const askQuestion = (reader: Interface, question: string): Promise<string> =>
    new Promise<string>((resolve) => {
        reader.question(question, (answer: any) => {
            resolve(answer);
        });
    });

export const getUserInputs = async (reader: any): Promise<any> => {
    const greeting = await askQuestion(reader, 'Enter greeting: ');
    const who = await askQuestion(reader, 'Enter who: ');
    const width = await askQuestion(reader, 'Enter width: ');
    const height = await askQuestion(reader, 'Enter height: ');
    const color = await askQuestion(reader, 'Enter color: ');
    const size = await askQuestion(reader, 'Enter size: ');

    return {
        greeting: greeting || 'Hello',
        who: who || 'You',
        width: Number(width) || 400,
        height: Number(height) || 500,
        color: color || 'Pink',
        size: Number(size) || 100,
    };
};
