
import { combineReducers } from 'redux';

import setSelectedThemeReducer from '../components/ThemeSection/reducer';
import { buckets,bucketsHasErrored,bucketsIsLoading, bucketDetail, createBucketReducer } from '../containers/Bucket/reducers';
import { tasksUnderBucketReducer, createTaskReducer } from '../containers/Task/reducers';

const rootReducer = combineReducers({
  selectedTheme: setSelectedThemeReducer,
  buckets,
  bucketsHasErrored,
  bucketsIsLoading,
  selectedBucket: bucketDetail,
  tasksUnderBucket: tasksUnderBucketReducer,
  createBucketReducer,
  createTaskReducer
});
 
export default rootReducer;