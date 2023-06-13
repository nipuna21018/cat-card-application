import axios from 'axios';
import { AxiosInstance } from 'axios';

export class ApiService {

  api: AxiosInstance;

  constructor(baseURL:string) {
    this.api = axios.create({ baseURL });
  }

  makeRequest(url: string, options = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api
        .request({ url, ...options })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: Error) => {
          reject(new Error(`Error making request to ${url}: ${error.message}`));
        });
    });
  }

}
