import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const unsplashResult = {
  urls: {
    raw: 'test_raw',
    thumb: 'test_thumb',
  },
  user: {
    first_name: 'Test',
    last_name: 'Test',
  },
  links: {
    html: 'test_photolink',
  },
};

const handlers = [
  http.get('https://restcountries.com/v3.1/all', () => HttpResponse.error()),
  http.get('https://api.unsplash.com/photos/testenburg', () => HttpResponse.json(unsplashResult)),
];

const server = setupServer(...handlers);

export default server;
