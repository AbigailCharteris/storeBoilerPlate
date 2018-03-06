import { combineEpics } from 'redux-observable';

export default function createEpics(asyncEpics = []) {
  return combineEpics(...asyncEpics);
}
