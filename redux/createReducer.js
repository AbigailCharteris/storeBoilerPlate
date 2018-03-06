import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

/*
 The scenario route index is intended to configure the container.
 For example. ScenarioContainer needs to register the scenarioReducer to obtain scenario data.

 getScenariosEpic is required orchestrate the api calls, and subsequent actions
 */

export default function createReducer(asyncReducers = {}) {
  return combineReducers({
    routing: routerReducer,
    ...asyncReducers,
  });
}
