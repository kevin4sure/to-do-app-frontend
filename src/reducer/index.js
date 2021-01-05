
import { combineReducers } from 'redux';

import setSelectedThemeReducer from '../components/ThemeSection/reducer';
import { buckets,bucketsHasErrored,bucketsIsLoading, bucketDetail } from '../containers/Bucket/reducers';
import { tasksUnderBucketReducer } from '../containers/Task/reducers';

const rootReducer = combineReducers({
  selectedTheme: setSelectedThemeReducer,
  buckets,
  bucketsHasErrored,
  bucketsIsLoading,
  selectedBucket: bucketDetail,
  tasksUnderBucket: tasksUnderBucketReducer
});
 
export default rootReducer;