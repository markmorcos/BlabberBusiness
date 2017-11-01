import {
  GET_BUSINESSES,
  GET_BUSINESSES_SUCCESS,
  GET_BUSINESSES_FAIL,
  FILTER_BUSINESSES
} from '../actions/types';

const INITIAL_STATE = {
  businesses: [],
  keyword: '',
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BUSINESSES:
      return { ...state, loading: true, error: '' };
    case GET_BUSINESSES_SUCCESS:
      return { ...state, businesses: action.payload, loading: false };
    case GET_BUSINESSES_FAIL:
      return { ...state, error: action.payload, loading: false };
    case FILTER_BUSINESSES:
      return { ...state, keyword: action.payload };
    default:
      return state;
  }
};
