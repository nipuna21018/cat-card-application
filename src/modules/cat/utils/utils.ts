import { promisify } from 'util';
import fs from 'fs';
import { ReadLine } from 'readline';

const writeFileAsync = promisify(fs.writeFile);

export const saveImageToFile = (filePath: string, buffer: Buffer): Promise<boolean> =>
    writeFileAsync(filePath, buffer, 'binary')
        .then(() => {
            console.log('The file was saved!');
            return true;
        })
        .catch((err: Error) => {
            throw new Error(`Failed to save image to file: ${err}`);
        });


export const getUserInputs = async (reader: ReadLine): Promise<any> => {
    const question = promisify(reader.question).bind(reader);

    const greeting = await question('Enter greeting: ');
    const who = await question('Enter who: ');
    const width = await question('Enter width: ');
    const height = await question('Enter height: ');
    const color = await question('Enter color: ');
    const size = await question('Enter size: ');
    const filename = await question('Enter file name to save image: ');

    const inputs = { greeting, who, width, height, color, size, filename, };
    return inputs;
};
