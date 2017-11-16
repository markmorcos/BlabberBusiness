import {
  GET_BUSINESSES,
  GET_BUSINESSES_SUCCESS,
  GET_BUSINESSES_FAIL,
  DELETE_BUSINESS,
  DELETE_BUSINESS_SUCCESS,
  DELETE_BUSINESS_FAIL,
  FILTER_BUSINESSES
} from './types';
import axios from 'axios';
import SInfo from 'react-native-sensitive-info';
import Toast from 'react-native-simple-toast';
import CarrierInfo from 'react-native-carrier-info';
import { baseURL } from '../config';

const api = axios.create({ baseURL });

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
    const mcc = Number((await CarrierInfo.mobileCountryCode()).substr(0, 3));
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

const deleteBusinessSuccess = (dispatch) => {
  dispatch({ type: DELETE_BUSINESS_SUCCESS });
  dispatch(getBusinesses());
};

const deleteBusinessFail = (dispatch, error) => {
  dispatch({ type: DELETE_BUSINESS_FAIL, payload: error });
  Toast.show(error);
};

export const deleteBusiness = business_id => {
  return async dispatch => {
    dispatch({ type: DELETE_BUSINESS });
    const user = JSON.parse(await SInfo.getItem('user', {}));
    api.post('delete-business', {
      user_id: user.id,
      auth_key: user.auth_key,
      business_id
    })
    .then(response => {
      if (response.data.status) {
        return deleteBusinessFail(dispatch, response.data.errors);
      }
      return deleteBusinessSuccess(dispatch);
    })
    .catch(() => deleteBusinessFail(dispatch, 'Delete business failed'));
  };
};

export const filterBusinesses = keyword => {
  return dispatch => dispatch({ type: FILTER_BUSINESSES, payload: keyword });
};
