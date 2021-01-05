
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer  from '../reducer';
 
const persistConfig = {
  key: 'sample_app',
  storage,
  whitelist: [ 'selectedTheme' ] 
};
 
// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const pReducer = persistReducer(persistConfig, rootReducer);
 
export const store = createStore(
  pReducer,
  composeEnhancer(applyMiddleware(thunk)),
);
export const persistor = persistStore(store);
 