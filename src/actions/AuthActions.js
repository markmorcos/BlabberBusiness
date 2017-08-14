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
} from './types';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Keyboard, Alert } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import Toast from 'react-native-simple-toast';

const api = axios.create({
  baseURL: 'http://myblabber.com/be-staging/api/'
});

export const photoChanged = response => {
  return { type: PHOTO_CHANGED, payload: response };
};

export const propChanged = (key, value) => {
  return { type: PROP_CHANGED, payload: { key, value } };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
  SInfo.setItem('user', JSON.stringify(user), {});
  Keyboard.dismiss();
  Actions.dashboard({ type: 'replace' });
};

const loginUserFail = (dispatch, error) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: error });
  Toast.show(error);
}

export const loginUser = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });
    api.post('sign-in', { email, password })
    .then(response => {
      if (response.data.status) {
        return loginUserFail(dispatch, response.data.errors);
      }
      const { auth_key, user_data } = response.data;
      user_data.auth_key = auth_key;
      return loginUserSuccess(dispatch, user_data);
    })
    .catch(() => loginUserFail(dispatch, 'Authentication failed'));
  };
};

export const getLoginState = () => {
  return async dispatch => {
    dispatch({ type: LOGIN_STATE });
    const user = await SInfo.getItem('user', {});
    if (user !== null) {
      dispatch({ type: LOGIN_STATE_SUCCESS });
      Actions.dashboard({ type: 'replace' });
    } else {
      dispatch({ type: LOGIN_STATE_FAIL, payload: 'Get login state failed' });
    }
  };
};

const logoutUserFail = (dispatch, error) => {
  dispatch({ type: LOGOUT_USER_FAIL, error });
  Toast.show(error);
};

export const logoutUser = () => {
  return dispatch => {
    Alert.alert(
      '',
      'Are you sure you want to logout?',
      [
        { text: 'No' },
        {
          text: 'Yes',
          onPress: async () => {
            dispatch({ type: LOGOUT_USER });
            const user = JSON.parse(await SInfo.getItem('user', {}));
            api.post('logout', { user_id: user.id, auth_key: user.auth_key })
            .then(response => {
              if (response.data.status) {
                return logoutUserFail(dispatch, response.data.errors);
              }
              dispatch({ type: LOGOUT_USER_SUCCESS });
              SInfo.deleteItem('user', {})
              .then(() => Actions.login({ type: 'replace' }))
            })
            .catch(() => logoutUserFail(dispatch, 'Logout user failed'));
          }
        }
      ],
      { cancelable: false }
    )
  };
};

const registerUserSuccess = dispatch => {
  dispatch({ type: REGISTER_USER_SUCCESS });
  Keyboard.dismiss();
  Actions.process({ type: 'replace' });
};

const registerUserFail = (dispatch, error) => {
  dispatch({ type: REGISTER_USER_FAIL, payload: error });
  Toast.show(error);
}

export const registerUser = ({
  media,
  name,
  username,
  mobile,
  email,
  password
}) => {
  return dispatch => {
    dispatch({ type: REGISTER_USER });
    let data = new window.FormData();
    media && data.append('Media[file]"; filename="photo.jpg"', media);
    data.append('name', name);
    data.append('username', username);
    data.append('mobile', mobile);
    data.append('email', email);
    data.append('password', password);
    data.append('type', 'business');
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }
    api.post('sign-up', data, config)
    .then(response => {
      const { status, errors } = response.data;
      if (status && errors != "your account not approved yet, we will update you by email when it's done") {
        return registerUserFail(dispatch, response.data.errors);
      }
      return registerUserSuccess(dispatch);
    })
    .catch(() => registerUserFail(dispatch, 'Registration failed'));
  };
};
