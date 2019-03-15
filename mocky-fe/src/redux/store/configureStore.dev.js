import { createStore, applyMiddleware, compose } from 'redux';
import { reducer, middleware } from '../rootModel';

const configureStore = preloadedState => {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, preloadedState, composeEnhancer(applyMiddleware(...middleware)));

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../rootModel').reducer;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
