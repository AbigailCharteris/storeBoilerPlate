import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import middlewares from './middlewares';
import createReducer from './createReducer';

export default function createAppStore(asyncMiddleware = []) {
  const router = routerMiddleware(browserHistory);

  const reducer = createReducer();

  const mergedMiddleware = applyMiddleware(
    ...asyncMiddleware,
    ...middlewares,
    router
  );

  const store = createStore(reducer, mergedMiddleware);

  return store;
}
