import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
  GET_REVIEW,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAIL,
  GET_MEDIA,
  GET_MEDIA_SUCCESS,
  GET_MEDIA_FAIL,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_REVIEWS,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  GET_MEDIA_LIST,
  GET_MEDIA_LIST_SUCCESS,
  GET_MEDIA_LIST_FAIL,
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
  users: [],
  reviews: [],
  mediaList: [],
  review: null,
  media: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return { ...state, loading: true, error: '' };
    case GET_NOTIFICATIONS_SUCCESS:
      return { ...state, notifications: action.payload, loading: false };
    case GET_NOTIFICATIONS_FAIL:
      return { ...state, error: action.payload, loading: false };
      case GET_REVIEW:
      return { ...state, loading: true, review: null, error: '' };
    case GET_REVIEW_SUCCESS:
      return { ...state, review: action.payload, loading: false };
    case GET_REVIEW_FAIL:
      return { ...state, error: action.payload, loading: false };
    case GET_MEDIA:
      return { ...state, loading: true, media: null, error: '' };
    case GET_MEDIA_SUCCESS:
      return { ...state, media: action.payload, loading: false };
    case GET_MEDIA_FAIL:
      return { ...state, error: action.payload, loading: false };
    case GET_USERS:
      return { ...state, loading: true, users: [], error: '' };
    case GET_USERS_SUCCESS:
      return { ...state, users: action.payload, loading: false };
    case GET_USERS_FAIL:
      return { ...state, error: action.payload, loading: false };
    case GET_REVIEWS:
      return { ...state, loading: true, reviews: [], error: '' };
    case GET_REVIEWS_SUCCESS:
      return { ...state, reviews: action.payload, loading: false };
    case GET_REVIEWS_FAIL:
      return { ...state, error: action.payload, loading: false };
      case GET_MEDIA_LIST:
      return { ...state, loading: true, mediaList: [], error: '' };
    case GET_MEDIA_LIST_SUCCESS:
      return { ...state, mediaList: action.payload, loading: false };
    case GET_MEDIA_LIST_FAIL:
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
