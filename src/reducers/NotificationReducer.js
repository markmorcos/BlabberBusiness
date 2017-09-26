import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  notifications: [],
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return { ...state, loading: true, error: '' };
    case GET_NOTIFICATIONS_SUCCESS:
      return { ...state, ...INITIAL_STATE, notifications: action.payload };
    case GET_NOTIFICATIONS_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
