
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer  from '../reducer';
 
const persistConfig = {
  key: 'sample_app',
  storage,
  whitelist: [ 'selectedTheme' ] 
};
 
const pReducer = persistReducer(persistConfig, rootReducer);
 
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
 
export const store = createStore(
  pReducer,
  reduxDevTools
);
export const persistor = persistStore(store);
 