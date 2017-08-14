import {
  GET_BUSINESSES,
  GET_BUSINESSES_SUCCESS,
  GET_BUSINESSES_FAIL
} from './types';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import SInfo from 'react-native-sensitive-info';
import Toast from 'react-native-simple-toast';

const api = axios.create({
  baseURL: 'http://myblabber.com/be-staging/api/'
});

const getBusinessesFail = (dispatch, error) => {
  dispatch({ type: GET_BUSINESSES_FAIL, payload: error });
  Toast.show(error);
};

export const getBusinesses = () => {
  return async dispatch => {
    dispatch({ type: GET_BUSINESSES });
    const user = JSON.parse(await SInfo.getItem('user', {}));
    api.post('get-homescreen-businesses', {
      user_id: user.id,
      auth_key: user.auth_key,
      country_id: 602
    })
    .then(response => {
      if (response.data.status) {
        return getBusinessesFail(dispatch, response.data.errors);
      }
      return dispatch({
        type: GET_BUSINESSES_SUCCESS,
        payload: response.data.businesses
      });
    })  
    .catch(() => getBusinessesFail(dispatch, 'Get businesses failed'));
  };
};