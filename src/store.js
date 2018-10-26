

import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';
import { todoApp } from './reducers/app_reducers.js'
import { createStore, combineReducers } from 'redux'

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  state => state,
  devCompose(
    lazyReducerEnhancer(combineReducers),
  )
);

store.addReducers({
  todoApp
})