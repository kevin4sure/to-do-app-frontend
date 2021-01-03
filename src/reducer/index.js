
import { combineReducers } from 'redux';

import setSelectedThemeReducer from '../components/ThemeSection/reducer';
 
const rootReducer = combineReducers({
  selectedTheme: setSelectedThemeReducer
});
 
export default rootReducer;