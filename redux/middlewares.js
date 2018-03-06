import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

export const loggerMiddleware = createLogger();

const middlewares = [
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware, // neat middleware that logs actions
];

export default middlewares;
