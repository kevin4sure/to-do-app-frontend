import { BUCKETS_ERROR,BUCKETS_LOADING,BUCKETS_SUCCESS, BUCKET_DETAIL_ERROR,BUCKET_DETAIL_LOADING,BUCKET_DETAIL_SUCCESS } from './types';

export const bucketsHasErrored = (state = false, action) => {
  switch (action.type) {
  case BUCKETS_ERROR:
    return action.hasErrored;

  default:
    return state;
  }
};

export const bucketsIsLoading = (state = false, action) => {
  switch (action.type) {
  case BUCKETS_LOADING:
    return action.isLoading;

  default:
    return state;
  }
};

export const buckets = (state = [], action) => {
  switch (action.type) {
  case BUCKETS_SUCCESS:
    return action.items;

  default:
    return state;
  }
};

export const bucketDetail = (state = null, action) => {
  switch (action.type) {
  case BUCKET_DETAIL_ERROR:
    return { error: action.hasErrored };
  case BUCKET_DETAIL_LOADING:
    return { loading: action.isLoading };
  case BUCKET_DETAIL_SUCCESS:
    return { data: action.items };    
  default:
    return state;
  }
};