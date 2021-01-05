
import { combineReducers } from 'redux';

import setSelectedThemeReducer from '../components/ThemeSection/reducer';
import { buckets,bucketsHasErrored,bucketsIsLoading } from '../containers/Bucket/reducers';

const rootReducer = combineReducers({
  selectedTheme: setSelectedThemeReducer,
  buckets,
  bucketsHasErrored,
  bucketsIsLoading,
});
 
export default rootReducer;