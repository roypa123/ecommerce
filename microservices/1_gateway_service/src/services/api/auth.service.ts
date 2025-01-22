import axios, { AxiosResponse } from 'axios';
import { AxiosService } from '@gateway/services/axios';
import { config } from '@gateway/config';

export let axiosAuthInstance: ReturnType<typeof axios.create>;


class AuthService {
  axiosService: AxiosService;

  constructor() {
    this.axiosService = new AxiosService(`${config.AUTH_BASE_URL}/api/v1/auth`, 'auth');
    axiosAuthInstance = this.axiosService.axios;
  }


  async signIn(body: any): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.axiosService.axios.post('/signIn', body)
    return response;
  }

}

export const authService: AuthService = new AuthService();
