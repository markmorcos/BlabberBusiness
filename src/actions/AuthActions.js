import {
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
import DeviceInfo from 'react-native-device-info';

const api = axios.create({
  baseURL: 'http://myblabber.com/be-staging/api/'
});

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
    console.log({
      email,
      password,
      device_IMEI: DeviceInfo.getUniqueID()
    });
    api.post('sign-in', {
      email,
      password,
      device_IMEI: DeviceInfo.getUniqueID(),
      firebase_token: ''
    })
    .then(response => {
      if (response.data.status) {
        return loginUserFail(dispatch, response.data.errors);
      }
      const { auth_key, user_data } = response.data;
      user_data.auth_key = auth_key;
      return loginUserSuccess(dispatch, user_data);
    })
    .catch(error => { console.log(error); loginUserFail(dispatch, 'Login failed'); });
  };
};

export const getLoginState = () => {
  return async dispatch => {
    dispatch({ type: LOGIN_STATE });
    const user = await SInfo.getItem('user', {});
    if (user !== null && user !== undefined) {
      dispatch({ type: LOGIN_STATE_SUCCESS });
      Actions.dashboard({ type: 'replace' });
    } else {
      dispatch({ type: LOGIN_STATE_FAIL, payload: 'Get login state failed' });
    }
  };
};

const logoutUserSuccess = async dispatch => {
  dispatch({ type: LOGOUT_USER_SUCCESS });
  await SInfo.deleteItem('user', {});
  Actions.login({ type: 'reset' });
};

const logoutUserFail = async (dispatch, error) => {
  dispatch({ type: LOGOUT_USER_FAIL, error });
  Toast.show(error);
  await SInfo.deleteItem('user', {});
  Actions.login({ type: 'reset' });
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
            api.post('logout', {
              user_id: user.id,
              auth_key: user.auth_key,
              device_IMEI: DeviceInfo.getUniqueID()
            })
            .then(response => {
              if (response.data.status) {
                return logoutUserFail(dispatch, response.data.errors);
              }
              return logoutUserSuccess(dispatch);
            })
            .catch(() => logoutUserFail(dispatch, 'Logout failed'));
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
    data.append('device_IMEI', DeviceInfo.getUniqueID());
    data.append('firebase_token', '');
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
