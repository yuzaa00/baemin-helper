export interface HttpClient {
  get(url: string, config?: any): Promise<any>;
  post(url: string, data?: any, config?: any): Promise<any>;
}

export class HttpAdapter {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  get(url: string, config?: any): Promise<any> {
    return this.client.get(url, config);
  }

  post(url: string, data?: any, config?: any): Promise<any> {
    return this.client.post(url, data, config);
  }
}
