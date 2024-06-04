import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('https://restcountries.com/v3.1/all', () => HttpResponse.error()),
];

const server = setupServer(...handlers);

export default server;
