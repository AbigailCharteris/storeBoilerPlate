import React, { createElement, PropTypes } from 'react';
import _ from 'lodash';
/*

   This is a higher order component which allows the developer to dynamically inject epics or reducers when their react component is loaded.
   The intention is to make each function (ie analysis) independent.

   The alternative is to add the epic/reducer directly to the store within common. This would be preferred if the reducer/epic is used elsewhere but created tight coupling.

 */

const requireFn = storeFunction => reducers => wrappedComponent => {
  const addToFn = _.memoize((_store, _storeFunction, _reducers) =>
    _store[_storeFunction](_reducers)
  );

  class ComponentWrapper extends React.Component {
    constructor(props, context) {
      super(props, context);

      const { store } = context;
      this.store = store;
      this.state = {};
    }

    componentWillMount() {
      addToFn(this.store, storeFunction, reducers);
      this.state = { component: createElement(wrappedComponent, this.props) };
    }

    render() {
      return this.state.component || <div />;
    }
  }

  ComponentWrapper.contextTypes = { store: PropTypes.object };

  return ComponentWrapper;
};

const requireReducers = requireFn('addReducers');
const requireEpics = requireFn('addEpics');

export { requireReducers, requireEpics };
