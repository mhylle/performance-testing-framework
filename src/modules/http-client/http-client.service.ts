import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class HttpClientService {
  async request(config: AxiosRequestConfig): Promise<{ response: AxiosResponse; duration: number }> {
    const startTime = process.hrtime();
    
    try {
      const response = await axios(config);
      const [seconds, nanoseconds] = process.hrtime(startTime);
      const duration = seconds * 1000 + nanoseconds / 1000000; // Convert to milliseconds
      
      return { response, duration };
    } catch (error) {
      const [seconds, nanoseconds] = process.hrtime(startTime);
      const duration = seconds * 1000 + nanoseconds / 1000000;
      
      throw {
        error,
        duration,
      };
    }
  }
}