import CatImageService from "./services/cat-image.service";
import mergeImg from 'merge-img';
import path from 'path';
import { promisify } from 'util';
import { saveImageToFile } from "./utils/utils";

export class CatCardGenerator {
  private catImageService: CatImageService;

  constructor() {
    this.catImageService = new CatImageService();
  }

  public async generateCatCard(options: CatCardOptions): Promise<void> {
    let { greeting, who, width, height, color, size, filename, } = options;

    try {

      greeting = greeting !== '' ? greeting : 'Hello';
      who = who !== '' ? who : 'You';
      width = Number(width);
      height = Number(height);
      color = color !== '' ? color : 'Pink';
      size = Number(size);
      filename = filename !== '' ? filename : 'cat-card';

      // Fetch two images
      const firstImage = await this.catImageService.getCatImageWithText(greeting, width, height, color, size);
      const secondImage = await this.catImageService.getCatImageWithText(who, width, height, color, size);

      // Merge the images into one image
      const img = await mergeImg([
        { src: firstImage, offsetX: 0, offsetY: 0 },
        { src: secondImage, offsetX: width, offsetY: 0 },
      ]);

      const getBufferAsync = promisify(img.getBuffer.bind(img));

      // Get the image buffer
      const buffer: Buffer = await getBufferAsync('image/jpeg');

      // Save the image in the root of the project with the specified name
      const fileOut = path.join(process.cwd(), `${filename}.jpg`);
      await saveImageToFile(fileOut, buffer);

      console.log('The file was saved!');
    } catch (err) {
      console.log(err);
    }
  }
}