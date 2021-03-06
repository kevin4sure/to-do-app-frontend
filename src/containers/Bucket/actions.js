import axios from 'axios';

import { BUCKETS_ERROR,BUCKETS_LOADING,BUCKETS_SUCCESS, BUCKET_DETAIL_ERROR,BUCKET_DETAIL_LOADING, BUCKET_DETAIL_SUCCESS, CREATE_BUCKET_LOADING,CREATE_BUCKET_SUCCESS,CREATE_BUCKET_ERROR } from './types';

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

const bucketDetailErrored = bool => {
  return {
    type: BUCKET_DETAIL_ERROR,
    hasErrored: bool
  };
};

const bucketDetailLoading = bool => {
  return {
    type: BUCKET_DETAIL_LOADING,
    isLoading: bool
  };
};

const bucketDetailSuccess = items => {
  return {
    type: BUCKET_DETAIL_SUCCESS,
    items
  };
};

const createBucketError = bool => {
  return {
    type: CREATE_BUCKET_ERROR,
    hasErrored: bool
  };
};

const createBucketLoading = bool => {
  return {
    type: CREATE_BUCKET_LOADING,
    isLoading: bool
  };
};

const createBucketSuccess = items => {
  return {
    type: CREATE_BUCKET_SUCCESS,
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
      .catch(e => {
        if (e.code === 404) {
          dispatch(bucketsHasErrored("Bucket Not Found."));
        } else {
          dispatch(bucketsHasErrored(true));
        }
      });
  };
};

export const bucketDetailFetchData = bucketId => {
  return dispatch => {
    dispatch(bucketDetailLoading(true));

    axios.get(`http://localhost:8000/bucket/${bucketId}`)
      .then(response => {
        dispatch(bucketDetailLoading(false));
        return response;
      })
      .then(response => response.data)
      .then(items => dispatch(bucketDetailSuccess(items)) )
      .catch(e => {
        if (e.response.status === 404) {
          dispatch(bucketDetailErrored("Bucket Not Found."));
        } else if (e?.response?.data?.msg) {
          dispatch(bucketDetailErrored(e.response.data.msg));
        } else {
          dispatch(bucketDetailErrored(true));
        }
      });
  };
};

export const createBucketAction = data => {
  return dispatch => {
    dispatch(createBucketLoading(true));

    const promise = new Promise((resolve,reject) => axios.post(`http://localhost:8000/buckets`, { ...data })
      .then(response => {
        dispatch(createBucketLoading(false));
        return response;
      })
      .then(response => response.data)
      .then(items => {
        dispatch(createBucketSuccess(items));
        resolve(items);
      })
      .catch(e => {
        if (e.response.status === 406) {
          dispatch(createBucketError(e.response.data));
        } else if (e?.response?.data?.msg) {
          dispatch(createBucketError(e.response.data.msg));
        } else {
          dispatch(createBucketError(true));
        }
        reject(e);
      }));
    return promise;  
  };
};

