import axios from 'axios';
import { AxiosInstance } from 'axios';
import { promisify } from 'util';
export class ApiService {
  api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({ baseURL });
  }

  makeRequest(url: string, options = {}): Promise<any> {
    const promisifiedRequest = promisify(this.api.request).bind(this.api);

    return promisifiedRequest({ url, ...options })
      .then((response: any) => response.data)
      .catch((error: Error) => {
        throw new Error(`Error making request to ${url}: ${error.message}`);
      });
  }
}
