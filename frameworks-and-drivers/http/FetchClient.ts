import { HttpClient } from 'interface-adapters/http/HttpAdapter';

export class FetchClient implements HttpClient {
  constructor() {}

  async get(url: string, config?: any): Promise<any> {
    const response = await fetch(url, { method: 'GET', ...config });
    return response.json();
  }

  async post(url: string, data?: any, config?: any): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config,
    });
    return response.json();
  }
}
