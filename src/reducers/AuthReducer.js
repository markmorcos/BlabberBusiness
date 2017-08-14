import {
  PHOTO_CHANGED,
  PROP_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
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
  REGISTER_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  media: null,
  name: '',
  username: '',
  mobile: '',
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PHOTO_CHANGED:
      return { ...state, media: action.payload };
    case PROP_CHANGED:
      return { ...state, [action.payload.key]: action.payload.value };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
      case PASSWORD_CHANGED:
        return { ...state, password: action.payload };
      case LOGIN_USER:
        return { ...state, loading: true, error: '' };
      case LOGIN_USER_SUCCESS:
        return { ...state, ...INITIAL_STATE, user: action.payload };
      case LOGIN_USER_FAIL:
        return { ...state, error: action.payload, password: '', loading: false };
      case LOGOUT_USER:
        return { ...state, ...INITIAL_STATE };
      case LOGIN_STATE:
        return { ...state, loading: true };
      case LOGIN_STATE_SUCCESS:
        return { ...state, loading: false };
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
    default:
      return state;
  }
};
