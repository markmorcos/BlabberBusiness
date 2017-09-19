import {
  PROP_CHANGED,
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAIL,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAIL,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_SUBCATEGORIES,
  GET_SUBCATEGORIES_SUCCESS,
  GET_SUBCATEGORIES_FAIL,
  GET_FLAGS,
  GET_FLAGS_SUCCESS,
  GET_FLAGS_FAIL,
  GET_INTERESTS,
  GET_INTERESTS_SUCCESS,
  GET_INTERESTS_FAIL
} from './types';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const api = axios.create({
  baseURL: 'http://myblabber.com/be-staging/api/'
});

const getCountriesSuccess = (dispatch, countries) => {
  dispatch({ type: GET_COUNTRIES_SUCCESS, payload: countries });
};

const getCountriesFail = (dispatch, error) => {
  dispatch({ type: GET_COUNTRIES_FAIL, payload: error });
  Toast.show(error);
};

export const getCountries = () => {
  return dispatch => {
    dispatch({ type: GET_COUNTRIES });
    api.get('get-countries')
    .then(response => {
      if (response.data.status) {
        return getCountriesFail(dispatch, response.data.errors);
      }
      return getCountriesSuccess(dispatch, response.data.countries);
    })  
    .catch(() => getCountriesFail(dispatch, 'Get countries failed'));
  };
};

const getCitiesSuccess = (dispatch, cities) => {
  dispatch({ type: GET_CITIES_SUCCESS, payload: cities });
};

const getCitiesFail = (dispatch, error) => {
  dispatch({ type: GET_CITIES_FAIL, payload: error });
  Toast.show(error);
};

export const getCities = countryId => {
  return dispatch => {
    dispatch({ type: GET_CITIES });
    api.get(`get-cities?country_id=${countryId}`)
    .then(response => {
      if (response.data.status) {
        return getCitiesFail(dispatch, response.data.errors);
      }
      return getCitiesSuccess(dispatch, response.data.cities);
    })  
    .catch(() => getCitiesFail(dispatch, 'Get cities failed'));
  };
};

const getCategoriesSuccess = (dispatch, categories) => {
  dispatch({ type: GET_CATEGORIES_SUCCESS, payload: categories });
};

const getCategoriesFail = (dispatch, error) => {
  dispatch({ type: GET_CATEGORIES_FAIL, payload: error });
  Toast.show(error);
};

export const getCategories = () => {
  return dispatch => {
    dispatch({ type: GET_CATEGORIES });
    api.get('get-categories')
    .then(response => {
      if (response.data.status) {
        return getCategoriesFail(dispatch, response.data.errors);
      }
      return getCategoriesSuccess(dispatch, response.data.categories);
    })  
    .catch(() => getCategoriesFail(dispatch, 'Get categories failed'));
  };
};

const getSubcategoriesSuccess = (dispatch, subcategories) => {
  dispatch({ type: GET_SUBCATEGORIES_SUCCESS, payload: subcategories });
};

const getSubcategoriesFail = (dispatch, error) => {
  dispatch({ type: GET_SUBCATEGORIES_FAIL, payload: error });
  Toast.show(error);
};

export const getSubcategories = categoryId => {
  console.log("response");
  return dispatch => {
    dispatch({ type: GET_SUBCATEGORIES });
    api.get(`get-sub-categories?category_id=${categoryId}`)
    .then(response => {
      if (response.data.status) {
        return getSubcategoriesFail(dispatch, response.data.errors);
      }
      return getSubcategoriesSuccess(dispatch, response.data.categories);
    })  
    .catch(() => getSubcategoriesFail(dispatch, 'Get subcategories failed'));
  };
};

const getFlagsSuccess = (dispatch, subcategories) => {
  dispatch({ type: GET_FLAGS_SUCCESS, payload: subcategories });
};

const getFlagsFail = (dispatch, error) => {
  dispatch({ type: GET_FLAGS_FAIL, payload: error });
  Toast.show(error);
};

export const getFlags = () => {
  return dispatch => {
    dispatch({ type: GET_FLAGS });
    api.get('get-flags')
    .then(response => {
      if (response.data.status) {
        return getFlagsFail(dispatch, response.data.errors);
      }
      return getFlagsSuccess(dispatch, response.data.flags);
    })  
    .catch(() => getFlagsFail(dispatch, 'Get flags failed'));
  };
};

const getInterestsSuccess = (dispatch, interests) => {
  dispatch({ type: GET_INTERESTS_SUCCESS, payload: interests });
};

const getInterestsFail = (dispatch, error) => {
  dispatch({ type: GET_INTERESTS_FAIL, payload: error });
  Toast.show(error);
};

export const getInterests = () => {
  return dispatch => {
    dispatch({ type: GET_INTERESTS });
    api.get('get-interests')
    .then(response => {
      if (response.data.status) {
        return getInterestsFail(dispatch, response.data.errors);
      }
      return getInterestsSuccess(dispatch, response.data.interests);
    })  
    .catch(() => getInterestsFail(dispatch, 'Get interests failed'));
  };
};
