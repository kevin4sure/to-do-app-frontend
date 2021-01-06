import axios from 'axios';

import { TASKS_ERROR,TASKS_LOADING,TASKS_SUCCESS, CREATE_TASKS_ERROR,CREATE_TASKS_LOADING,CREATE_TASKS_SUCCESS, UPDATE_TASK_ERROR,UPDATE_TASK_LOADING,UPDATE_TASK_SUCCESS } from "./types";

const tasksError = err => {
  return {
    type: TASKS_ERROR,
    hasErrored: err
  };
};

const tasksLoading = bool => {
  return {
    type: TASKS_LOADING,
    isLoading: bool
  };
};
  
const tasksSuccess = items => {
  return {
    type: TASKS_SUCCESS,
    items
  };
};

const createTasksError = err => {
  return {
    type: CREATE_TASKS_ERROR,
    hasErrored: err
  };
};
    
const createTasksLoading = bool => {
  return {
    type: CREATE_TASKS_LOADING,
    isLoading: bool
  };
};
    
const createTasksSuccess = items => {
  return {
    type: CREATE_TASKS_SUCCESS,
    items
  };
};

const updateTasksError = err => {
  return {
    type: UPDATE_TASK_ERROR,
    hasErrored: err
  };
};
    
const updateTasksLoading = bool => {
  return {
    type: UPDATE_TASK_LOADING,
    isLoading: bool
  };
};
    
const updateTasksSuccess = items => {
  return {
    type: UPDATE_TASK_SUCCESS,
    items
  };
};

export const tasksUnderBucketFetchData = id => {
  return dispatch => {
    dispatch(tasksLoading(true));
  
    const promise = new Promise((resolve, reject) => axios.get(`http://localhost:8000/bucket/${id}/tasks`)
      .then(response => {
        dispatch(tasksLoading(false));
        return response;
      })
      .then(response => response.data)
      .then(items => {
        dispatch(tasksSuccess(items));
        resolve(items); 
      })
      .catch(e => {
        if (e.response.status === 404) {
          dispatch(tasksError("Tasks Not Found."));
        } else if (e?.response?.data?.msg) {
          dispatch(tasksError(e.response.data.msg));
        } else {
          dispatch(tasksError("some error occurred"));
        }
        reject(e);
      }));
    return promise;  
  };
};
  
export const createTaskAction = data => {
  return dispatch => {
    dispatch(createTasksLoading(true));
    
    const promise = new Promise((resolve, reject) => axios.post(`http://localhost:8000/tasks`, { ...data })
      .then(response => {
        dispatch(createTasksLoading(false));
        return response;
      })
      .then(response => response.data)
      .then(items => {
        dispatch(createTasksSuccess(items));
        resolve(items); 
      })
      .catch(e => {
        if (e.response.status === 406) {
          dispatch(createTasksError(e.response.data));
        } else if (e?.response?.data?.msg) {
          dispatch(createTasksError(e.response.data.msg));
        } else {
          dispatch(createTasksError(true));
        }
        reject(e);
      }));
    return promise;  
  };
};

export const updateTaskStatus = (id, data) => {
  return dispatch => {
    const promise = new Promise((resolve, reject) => axios.put(`http://localhost:8000/task/${id}`, { ...data })
      .then(response => {
        dispatch(updateTasksLoading(false));
        return response;
      })
      .then(response => response.data)
      .then(items => {
        dispatch(updateTasksSuccess(items));
        resolve(items); 
      })
      .catch(e => {
        if (e.response.status === 406) {
          dispatch(updateTasksError(e.response.data));
        } else if (e?.response?.data?.msg) {
          dispatch(updateTasksError(e.response.data.msg));
        } else {
          dispatch(updateTasksError(true));
        }
        reject(e);
      }));
    return promise;
  };
};
