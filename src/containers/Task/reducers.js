import { TASKS_ERROR,TASKS_LOADING,TASKS_SUCCESS } from './types';

// eslint-disable-next-line import/prefer-default-export
export const tasksUnderBucketReducer = (state= null, action) => {
  switch (action.type) {
  case TASKS_ERROR:
    return { error: action.hasErrored };
  case TASKS_LOADING:
    return { loading: action.isLoading };
  case TASKS_SUCCESS:
    return { data: action.items };    
  default:
    return state;
  }
};