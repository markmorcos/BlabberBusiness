import {
  GET_BUSINESSES,
  GET_BUSINESSES_SUCCESS,
  GET_BUSINESSES_FAIL,
  FILTER_BUSINESSES
} from './types';
import axios from 'axios';
import SInfo from 'react-native-sensitive-info';
import Toast from 'react-native-simple-toast';
import CarrierInfo from 'react-native-carrier-info';

const api = axios.create({
  baseURL: 'http://myblabber.com/be-staging/api/'
});

const getBusinessesSuccess = (dispatch, businesses) => {
  dispatch({ type: GET_BUSINESSES_SUCCESS, payload: businesses });
};

const getBusinessesFail = (dispatch, error) => {
  dispatch({ type: GET_BUSINESSES_FAIL, payload: error });
  Toast.show(error);
};

export const getBusinesses = () => {
  return async dispatch => {
    dispatch({ type: GET_BUSINESSES });
    const user = JSON.parse(await SInfo.getItem('user', {}));
    const mcc = 602; // Number((await CarrierInfo.mobileCountryCode()).substr(0, 3));
    api.post('get-businesses-by-owner', {
      user_id: user.id,
      auth_key: user.auth_key,
      country_id: mcc || 602
    })
    .then(response => {
      if (response.data.status) {
        return getBusinessesFail(dispatch, response.data.errors);
      }
      return getBusinessesSuccess(dispatch, response.data.businesses);
    })  
    .catch(() => getBusinessesFail(dispatch, 'Get businesses failed'));
  };
};

export const filterBusinesses = keyword => {
  return dispatch => dispatch({ type: FILTER_BUSINESSES, payload: keyword });
};
