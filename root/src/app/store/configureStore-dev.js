import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import routes from '../routes';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export default function configureStore(initialState) {
  const store = compose(
    applyMiddleware(thunk),
    DevTools.instrument()
  )(createStore)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
