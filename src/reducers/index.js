import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BusinessReducer from './BusinessReducer';

export default combineReducers({
  auth: AuthReducer,
  businesses: BusinessReducer
});
