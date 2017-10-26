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
    api.post('get-all-notifications?format=list', {
      user_id: user.id,
      auth_key: user.auth_key
    })
    .then(response => {
      if (response.data.status) {
        return getNotificationsFail(dispatch, response.data.errors);
      }
      const notifications = response.data.notifications.filter(notification => {
        const { type } = notification.data;
        return type === 'review' || type === 'media' || type === 'checkin' || type === 'favorite';
      })
      return getNotificationsSuccess(dispatch, notifications);
    })  
    .catch((error) => {console.log(error);getNotificationsFail(dispatch, 'Get notifications failed')});
  };
};

const getCommentsSuccess = (dispatch, review) => {
  dispatch({ type: GET_COMMENTS_SUCCESS, payload: review });
};

const getCommentsFail = (dispatch, error) => {
  dispatch({ type: GET_COMMENTS_FAIL, payload: error });
  Toast.show(error);
};

export const getComments = (object_id, object_type) => {
  return async dispatch => {
    dispatch({ type: GET_COMMENTS });
    const user = JSON.parse(await SInfo.getItem('user', {}));
    api.post('get-comments', {
      user_id: user.id,
      auth_key: user.auth_key,
      object_id,
      object_type
    })
    .then(response => {
      if (response.data.status) {
        return getCommentsFail(dispatch, response.data.errors);
      }
      return getCommentsSuccess(dispatch, response.data.comments);
    })  
    .catch((error) => getCommentsFail(dispatch, 'Get comments failed'));
  };
}

const addCommentSuccess = (dispatch, object_id, object_type) => {
  dispatch({ type: ADD_COMMENT_SUCCESS });
  dispatch(getComments(object_id, object_type));
};

const addCommentFail = (dispatch, error) => {
  dispatch({ type: ADD_COMMENT_FAIL, payload: error });
  Toast.show(error);
};

export const addComment = (text, object_id, object_type, business_identity) => {
  return async dispatch => {
    dispatch({ type: ADD_COMMENT });
    const user = JSON.parse(await SInfo.getItem('user', {}));
    api.post('comment', {
      user_id: user.id,
      auth_key: user.auth_key,
      text,
      object_id,
      object_type,
      business_identity
    })
    .then(response => {
      if (response.data.status) {
        return addCommentFail(dispatch, response.data.errors);
      }
      return addCommentSuccess(dispatch, object_id, object_type);
    })  
    .catch((error) => getCommentsFail(dispatch, 'Get comments failed'));
  };
}