import { BUCKETS_ERROR,BUCKETS_LOADING,BUCKETS_SUCCESS } from './types';

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