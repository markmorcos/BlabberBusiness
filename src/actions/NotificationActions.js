import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL
} from './types';
import axios from 'axios';
import SInfo from 'react-native-sensitive-info';
import Toast from 'react-native-simple-toast';

const api = axios.create({
  baseURL: 'http://myblabber.com/be-staging/api/'
});

const getNotificationsSuccess = (dispatch, notifications) => {
  dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: notifications });
};

const getNotificationsFail = (dispatch, error) => {
  dispatch({ type: GET_NOTIFICATIONS_FAIL, payload: error });
  Toast.show(error);
};

export const getNotifications = () => {
  return async dispatch => {
    dispatch({ type: GET_NOTIFICATIONS });
    const user = JSON.parse(await SInfo.getItem('user', {}));
    api.post('get-all-notifications', {
      user_id: user.id,
      auth_key: user.auth_key
    })
    .then(response => {
      if (response.data.status) {
        return getNotificationsFail(dispatch, response.data.errors);
      }
      const {
        new_friend_request,
        friend_request_accepted,
        review_tag,
        comment
      } = response.data.notifications;
      // photo, review, checkin, favourite
      const notifications = []
        .concat(new_friend_request)
        .concat(friend_request_accepted)
        .concat(review_tag)
        .concat(comment);
      return getNotificationsSuccess(dispatch, notifications);
    })  
    .catch(() => getNotificationsFail(dispatch, 'Get notifications failed'));
  };
};
