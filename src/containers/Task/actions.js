import axios from 'axios';

import { TASKS_ERROR,TASKS_LOADING,TASKS_SUCCESS } from "./types";

export const tasksError = err => {
  return {
    type: TASKS_ERROR,
    hasErrored: err
  };
};
  
export const tasksLoading = bool => {
  return {
    type: TASKS_LOADING,
    isLoading: bool
  };
};
  
export const tasksSuccess = items => {
  return {
    type: TASKS_SUCCESS,
    items
  };
};
  
export const tasksUnderBucketFetchData = id => {
  return dispatch => {
    dispatch(tasksLoading(true));
  
    axios.get(`http://localhost:8000/bucket/${id}/tasks`)
      .then(response => {
        dispatch(tasksLoading(false));
        return response;
      })
      .then(response => response.data)
      .then(items => dispatch(tasksSuccess(items)) )
      .catch(e => {
        if (e.response.status === 404) {
          dispatch(tasksError("Tasks Not Found."));
        } else if (e?.response?.data?.msg) {
          dispatch(tasksError(e.response.data.msg));
        } else {
          dispatch(tasksError("some error occurred"));
        }
      });
  };
};
  