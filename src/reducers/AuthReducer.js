import {
  PROP_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_STATE,
  LOGIN_STATE_SUCCESS,
  LOGIN_STATE_FAIL,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  UPDATE_PHOTO,
  UPDATE_PHOTO_SUCCESS,
  UPDATE_PHOTO_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  media: null,
  name: '',
  username: '',
  mobile: '',
  email: '',
  password: '',
  confirmPassword: '',
  user: null,
  error: '',
  loading: false,
  changing: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROP_CHANGED:
      return { ...state, [action.payload.key]: action.payload.value };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload, password: '', loading: false };
    case LOGOUT_USER:
      return { ...state, ...INITIAL_STATE };
    case LOGIN_STATE:
      return { ...state, loading: true };
    case LOGIN_STATE_SUCCESS:
      const user = action.payload;
      return {
        ...state,
        media: user.profile_photo ? { uri: user.profile_photo } : null,
        name: user.name,
        username: user.username,
        mobile: user.mobile,
        password: '',
        loading: false
      };
    case LOGIN_STATE_FAIL:
      return { ...state, error: action.payload, loading: false };
    case LOGOUT_USER:
      return { ...state, loading: true };
    case LOGOUT_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case LOGOUT_USER_FAIL:
      return { ...state, error: action.payload, loading: false };
    case REGISTER_USER:
      return { ...state, loading: true, error: '' };
    case REGISTER_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case REGISTER_USER_FAIL:
      return { ...state, error: action.payload, password: '', loading: false };
    case UPDATE_PHOTO:
      return { ...state, error: '' };
    case UPDATE_PHOTO_SUCCESS:
      return { ...state };
    case UPDATE_PHOTO_FAIL:
      return { ...state, error: action.payload };
    case UPDATE_USER:
      return { ...state, error: '', loading: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, error: '', loading: false };
    case UPDATE_USER_FAIL:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_PASSWORD:
      return { ...state, error: '', changing: true };
    case UPDATE_PASSWORD_SUCCESS:
      return { ...state, password: '', error: '', changing: false };
    case UPDATE_PASSWORD_FAIL:
      return { ...state, error: action.payload, changing: false };
    default:
      return state;
  }
};
