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
} from './types';
import axios from 'axios';
import SInfo from 'react-native-sensitive-info';
import Toast from 'react-native-simple-toast';
import { baseURL } from '../config';

const api = axios.create({ baseURL });

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
      const notifications = response.data.notifications.list.filter(notification => {
        const { type } = notification.data;
        return type === 'review' || type === 'media' || type === 'checkin' || type === 'favorite' || type === 'comment';
      })
      return getNotificationsSuccess(dispatch, notifications);
    })  
    .catch(() => getNotificationsFail(dispatch, 'Get notifications failed'));
  };
};

const getReviewSuccess = (dispatch, review) => {
  dispatch({ type: GET_REVIEW_SUCCESS, payload: review });
};

const getReviewFail = (dispatch, error) => {
  dispatch({ type: GET_REVIEW_FAIL, payload: error });
  Toast.show(error);
};

export const getReview = review_id => {
  return dispatch => {
    dispatch({ type: GET_REVIEW });
    api.post('get-review', { review_id })
    .then(response => {
      if (response.data.status) {
        return getReviewFail(dispatch, response.data.errors);
      }
      return getReviewSuccess(dispatch, response.data.review);
    })  
    .catch(() => getReviewFail(dispatch, 'Get review failed'));
  };
}

const getMediaSuccess = (dispatch, media) => {
  dispatch({ type: GET_MEDIA_SUCCESS, payload: media });
};

const getMediaFail = (dispatch, error) => {
  dispatch({ type: GET_MEDIA_FAIL, payload: error });
  Toast.show(error);
};

export const getMedia = ids => {
  return dispatch => {
    dispatch({ type: GET_MEDIA });
    api.post('get-media-by-ids', { ids })
    .then(response => {
      if (response.data.status) {
        return getMediaFail(dispatch, response.data.errors);
      }
      return getMediaSuccess(dispatch, response.data.media[0]);
    })  
    .catch(() => getMediaFail(dispatch, 'Get media failed'));
  };
}

const getUsersSuccess = (dispatch, users) => {
  dispatch({ type: GET_USERS_SUCCESS, payload: users });
};

const getUsersFail = (dispatch, error) => {
  dispatch({ type: GET_USERS_FAIL, payload: error });
  Toast.show(error);
};

export const getUsers = (business_id, type) => {
  return async dispatch => {
    dispatch({ type: GET_USERS });
    const user = JSON.parse(await SInfo.getItem('user', {}));
    const key = type === 'checkins' ? 'business_id_to_get' : 'business_to_get';
    api.post(`get-${type}`, { [key]: business_id, user_id: user.id, auth_key: user.auth_key })
    .then(response => {
      if (response.data.status) {
        return getUsersFail(dispatch, response.data.errors);
      }
      const users = type === 'checkins'
      ? response.data.checkins.map(checkin => checkin.user)
      : response.data.users;
      return getUsersSuccess(dispatch, users);
    })  
    .catch(() => getUsersFail(dispatch, 'Get users failed'));
  };
}

const getReviewsSuccess = (dispatch, reviews) => {
  dispatch({ type: GET_REVIEWS_SUCCESS, payload: reviews });
};

const getReviewsFail = (dispatch, error) => {
  dispatch({ type: GET_REVIEWS_FAIL, payload: error });
  Toast.show(error);
};

export const getReviews = business_id_to_get => {
  return async dispatch => {
    dispatch({ type: GET_REVIEWS });
    const user = JSON.parse(await SInfo.getItem('user', {}));
    api.post('get-reviews', { business_id_to_get, user_id: user.id, auth_key: user.auth_key })
    .then(response => {
      if (response.data.status) {
        return getReviewsFail(dispatch, response.data.errors);
      }
      return getReviewsSuccess(dispatch, response.data.reviews);
    })  
    .catch(() => getReviewsFail(dispatch, 'Get reviews failed'));
  };
}

const getMediaListSuccess = (dispatch, users) => {
  dispatch({ type: GET_MEDIA_LIST_SUCCESS, payload: users });
};

const getMediaListFail = (dispatch, error) => {
  dispatch({ type: GET_MEDIA_LIST_FAIL, payload: error });
  Toast.show(error);
};

export const getMediaList = business_id_to_get => {
  return async dispatch => {
    dispatch({ type: GET_MEDIA_LIST });
    const user = JSON.parse(await SInfo.getItem('user', {}));
    api.post('get-media', { business_id_to_get, user_id: user.id, auth_key: user.auth_key })
    .then(response => {
      if (response.data.status) {
        return getMediaListFail(dispatch, response.data.errors);
      }
      return getMediaListSuccess(dispatch, response.data.media);
    })  
    .catch(() => getMediaListFail(dispatch, 'Get media list failed'));
  };
}

const getCommentsSuccess = (dispatch, comment) => {
  dispatch({ type: GET_COMMENTS_SUCCESS, payload: comment });
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
    .catch(() => getCommentsFail(dispatch, 'Get comments failed'));
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
    .catch(() => getCommentsFail(dispatch, 'Get comments failed'));
  };
}