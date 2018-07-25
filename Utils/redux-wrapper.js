import _ from 'lodash';
import {combineReducers, createStore} from 'redux';

export class Store {
  constructor(reducers) {
    this.store = createStore(combineReducers(reducers), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  state() {
    return this.store.getState();
  }

  subscribe(callback) {
    return this.store.subscribe(callback);
  }

  dispatch(action) {
    this.store.dispatch(action);
  }

  update(type, params = {}) {
    this.store.dispatch({type, params});
  }
}

export class Reducer {
  constructor(initial) {
    this.actions = [];
    this.initial = initial;
  }

  register(type, handler) {
    this.actions[type] = handler;
  }

  combine() {
    return (state, action) => {
      state = state || this.initial;
      let handle = this.actions[action.type];
      return (handle) ? handle(_.cloneDeep(state), action) : state;
    };
  }
}
