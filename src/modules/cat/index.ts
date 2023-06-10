import CatImageService from "./services/cat-image.service";
import mergeImg from 'merge-img';
import path from 'path';
import { saveImageToFile } from "./utils/utils";

export class CatCardGenerator {
  private catImageService: CatImageService;

  constructor() {
    this.catImageService = new CatImageService();
  }

  public async generateCatCard(options: CatCardOptions): Promise<void> {
    const {
      greeting = 'Hello',
      who = 'You',
      width = 400,
      height = 500,
      color = 'Pink',
      size = 100,
      filename = 'cat-card.jpg'
    } = options;

    try {

      // fetch two images
      const firstImage = await this.catImageService.getCatImageWithText(greeting, width, height, color, size);
      const secondImage = await this.catImageService.getCatImageWithText(who, width, height, color, size);

      // merge the images into one image
      const img = await mergeImg([
        { src: firstImage, offsetX: 0, offsetY: 0 },
        { src: secondImage, offsetX: width, offsetY: 0 },
      ]);

      const buffer = await new Promise<Buffer>((resolve, reject) => {
        img.getBuffer('image/jpeg', (err: Error | null, buf: Buffer) => {
          if (err) {
            reject(err);
          } else {
            resolve(buf);
          }
        });
      });

      // save image in the root of the project with name
      const fileOut = path.join(process.cwd(), filename + '.jpg');
      await saveImageToFile(buffer, fileOut);
    } catch (err) {
      console.log(err);
    }
  }
}