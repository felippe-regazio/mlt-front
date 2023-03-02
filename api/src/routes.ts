import { Express } from 'express';

/**
 * Register available routes to the intire app, prefer this
 * way to allow this file to be used as a reference for the
 * application endpoints. All the endpoints are exported using
 * CJS (module.exports) to allow direct require here, avoiding
 * double declaration. 
 * 
 * @param app Express
 */
export const routes = (app: Express) => {
  app.get('/', require('./endpoints/index'));
  app.get('/signin', require('./endpoints/signin'));
  app.get('/profile', require('./endpoints/profile'));
}
