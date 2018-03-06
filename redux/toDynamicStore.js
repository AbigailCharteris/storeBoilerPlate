import { createEpicMiddleware } from 'redux-observable';
import createReducer from './createReducer';
import createEpics from './createEpics';

export const ASYNC_EPIC_REPOSITORY = 'asyncEpics';
export const ASYNC_REDUCER_REPOSITORY = 'asyncReducers';

/* eslint-disable no-param-reassign */
const addReducers = store => reducers => {
  store[ASYNC_REDUCER_REPOSITORY] = {
    ...store[ASYNC_REDUCER_REPOSITORY],
    ...reducers,
  };
  const newReducers = createReducer(store[ASYNC_REDUCER_REPOSITORY]);
  store.replaceReducer(newReducers);
};

const addEpics = (store, epicMiddleware) => epics => {
  if (store[ASYNC_EPIC_REPOSITORY] && store[ASYNC_EPIC_REPOSITORY].length > 0) {
    const storeEpicNames = store[ASYNC_EPIC_REPOSITORY].map(epic => epic.name);

    // Filter epics to avoid adding those which are already registered
    // eslint-disable-next-line no-param-reassign
    epics = epics.filter(epic => storeEpicNames.indexOf(epic.name) < 0);
  }

  if (epics.length > 0) {
    store[ASYNC_EPIC_REPOSITORY] = [...store[ASYNC_EPIC_REPOSITORY], ...epics];
    const newEpics = createEpics(store[ASYNC_EPIC_REPOSITORY]);
    epicMiddleware.replaceEpic(newEpics);
  }
};
/* eslint-enable no-param-reassign */

export default function toDynamicStore(createStoreFn) {
  const epicMiddleware = createEpicMiddleware(createEpics());

  const store = createStoreFn([epicMiddleware]);

  store[ASYNC_REDUCER_REPOSITORY] = {};
  store[ASYNC_EPIC_REPOSITORY] = [];

  store.addReducers = addReducers(store);

  store.addEpics = addEpics(store, epicMiddleware);

  return store;
}
