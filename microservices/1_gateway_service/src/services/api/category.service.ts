import axios, { AxiosResponse } from 'axios';
import { AxiosService } from '@gateway/services/axios';
import { config } from '@gateway/config';
export let axiosAuthInstance: ReturnType<typeof axios.create>;

class CategoryService {
  axiosService: AxiosService;

  constructor() {
    this.axiosService = new AxiosService(`${config.AUTH_BASE_URL}/api/v1/category`, 'category');
    axiosAuthInstance = this.axiosService.axios;
  }

  async signUp(body: any): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.axiosService.axios.post('/category', body);
    return response;
  }


}

export const authService: CategoryService = new CategoryService();
