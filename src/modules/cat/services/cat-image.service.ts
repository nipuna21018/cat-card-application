import { config } from "../../../config/config";
import { ApiService } from "../../common/services/api.service";


export default class CatImageService {

  private apiService:any;
  private path = '/cat/says/';

  constructor() {
    const catAsAServiceUrl:any = config.catAsAServiceUrl;
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
  async getCatImageWithText(text:string, width:number, height:number, color:string, size:number) {
    const endpoint = `${this.path}${encodeURIComponent(text)}`;
    const params = { width, height, color, s: size };

    try {
      // important to make the header response type as `arraybuffer`
      const response = await  this.apiService.makeRequest(endpoint, { params, responseType: 'arraybuffer' });
      console.log('Cat image fetching completed successfully!');
      return Buffer.from(response, 'binary');
    } catch (error:any) {
      throw new Error(`Failed to fetch cat image with text: ${error.message}`);
    }
  }

}