import { config } from "../../../config/config";
import { ApiService } from "../../common/services/api.service";


export default class CatImageService {

  private apiService: ApiService;
  private path = '/cat/says/';

  constructor() {
    const catAsAServiceUrl: string = config.catAsAServiceUrl || '';
    this.apiService = new ApiService(catAsAServiceUrl);
  }

  /**
   * 
   * @param text text to draw on image
   * @param width width of the image
   * @param height height of the image
   * @param color color of the cat
   * @param size size of cat
   * @returns image buffer
   */
  getCatImageWithText(text: string, width: number, height: number, color: string, size: number): Promise<Buffer> {
    const endpoint = `${this.path}${encodeURIComponent(text)}`;
    const params = { width, height, color, s: size };

    return new Promise<Buffer>((resolve, reject) => {
      this.apiService
        .makeRequest(endpoint, { params, responseType: 'arraybuffer' })
        .then((response: ArrayBuffer) => {
          console.log('Cat image fetching completed successfully!');
          resolve(Buffer.from(response));
        })
        .catch((error: Error) => {
          reject(new Error(`Failed to fetch cat image with text: ${error.message}`));
        });
    });
  }
}