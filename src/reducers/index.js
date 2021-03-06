import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BusinessReducer from './BusinessReducer';
import BusinessFormReducer from './BusinessFormReducer';
import NotificationReducer from './NotificationReducer';

export default combineReducers({
  auth: AuthReducer,
  business: BusinessReducer,
  businessForm: BusinessFormReducer,
  notification: NotificationReducer
});
