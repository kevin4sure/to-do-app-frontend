import { TASKS_ERROR,TASKS_LOADING,TASKS_SUCCESS, CREATE_TASKS_ERROR,CREATE_TASKS_LOADING,CREATE_TASKS_SUCCESS } from './types';

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

export const createTaskReducer = (state= null, action) => {
  switch (action.type) {
  case CREATE_TASKS_ERROR:
    return { error: action.hasErrored };
  case CREATE_TASKS_LOADING:
    return { loading: action.isLoading };
  case CREATE_TASKS_SUCCESS:
    return { data: action.items };    
  default:
    return state;
  }
};