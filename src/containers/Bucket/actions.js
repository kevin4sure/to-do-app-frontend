import axios from 'axios';

import { BUCKETS_ERROR,BUCKETS_LOADING,BUCKETS_SUCCESS } from './types';

export const bucketsHasErrored = bool => {
  return {
    type: BUCKETS_ERROR,
    hasErrored: bool
  };
};

export const buketsIsLoading = bool => {
  return {
    type: BUCKETS_LOADING,
    isLoading: bool
  };
};

export const bucketsFetchDataSuccess = items => {
  return {
    type: BUCKETS_SUCCESS,
    items
  };
};

export const bucketsFetchData = () => {
  return dispatch => {
    dispatch(buketsIsLoading(true));

    axios.get(`http://localhost:8000/buckets`)
      .then(response => {
        dispatch(buketsIsLoading(false));
        return response;
      })
      .then(response => response.data)
      .then(items => dispatch(bucketsFetchDataSuccess(items)) )
      .catch(() => {
        dispatch(bucketsHasErrored(true));
      });
  };
};