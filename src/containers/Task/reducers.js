import { TASKS_ERROR,TASKS_LOADING,TASKS_SUCCESS, CREATE_TASKS_ERROR,CREATE_TASKS_LOADING,CREATE_TASKS_SUCCESS, UPDATE_TASK_ERROR,UPDATE_TASK_LOADING,UPDATE_TASK_SUCCESS, DELETE_TASK_ERROR,DELETE_TASK_LOADING,DELETE_TASK_SUCCESS } from './types';

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

export const updateTaskReducer = (state= null, action) => {
  switch (action.type) {
  case UPDATE_TASK_ERROR:
    return { error: action.hasErrored };
  case UPDATE_TASK_LOADING:
    return { loading: action.isLoading };
  case UPDATE_TASK_SUCCESS:
    return { data: action.items };    
  default:
    return state;
  }
};

export const deleteTaskReducer = (state= null, action) => {
  switch (action.type) {
  case DELETE_TASK_ERROR:
    return { error: action.hasErrored };
  case DELETE_TASK_LOADING:
    return { loading: action.isLoading };
  case DELETE_TASK_SUCCESS:
    return { data: action.items };    
  default:
    return state;
  }
};