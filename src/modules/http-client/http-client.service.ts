import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class HttpClientService {
  async request(config: AxiosRequestConfig): Promise<{ response: AxiosResponse; duration: number }> {
    const startTime = Date.now();
    try {
      const response = await axios(config);
      const duration = Date.now() - startTime;
      return { response, duration };
    } catch (error) {
      throw error;
    }
  }
}