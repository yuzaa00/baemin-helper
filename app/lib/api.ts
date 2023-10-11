import { FetchClient } from 'frameworks-and-drivers/http/FetchClient';
import { HttpAdapter } from 'interface-adapters/http/HttpAdapter';

const fetchClient = new FetchClient();
export const menuApi = new HttpAdapter(fetchClient);
