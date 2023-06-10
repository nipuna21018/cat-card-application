import axios from 'axios';

export class ApiService {

  api: any;

  constructor(baseURL:string) {
    this.api = axios.create({ baseURL });
  }

  async makeRequest(url:string, options = {}) {
    try {
      const response = await this.api.request({ url, ...options });
      return response.data;
    } catch (error:any) {
      throw new Error(`Error making request to ${url}: ${error.message}`);
    }
  }

}
