 
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import { store, persistor } from './store';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null} >
      <App />
    </PersistGate>
  </Provider>, 
  document.getElementById('root'));
  
registerServiceWorker();