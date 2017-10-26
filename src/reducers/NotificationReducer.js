import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
  GET_COMMENTS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  notifications: [],
  comments: [],
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
    case GET_COMMENTS:
      return { ...state, loading: true, comments: [], error: '' };
    case GET_COMMENTS_SUCCESS:
      return { ...state, comments: action.payload, loading: false };
    case GET_COMMENTS_FAIL:
      return { ...state, error: action.payload, loading: false };
    case ADD_COMMENT:
      return { ...state, loading: true, error: '' };
    case ADD_COMMENT_SUCCESS:
      return { ...state, loading: false };
    case ADD_COMMENT_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
