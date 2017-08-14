import {
  GET_BUSINESSES,
  GET_BUSINESSES_SUCCESS,
  GET_BUSINESSES_FAIL
} from '../actions/types';

const INITIAL_STATE = { businesses: [], error: '', loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case GET_BUSINESSES:
        return { ...state, loading: true, error: '' };
      case GET_BUSINESSES_SUCCESS:
        return { ...state, ...INITIAL_STATE, businesses: action.payload };
      case GET_BUSINESSES_FAIL:
        return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
