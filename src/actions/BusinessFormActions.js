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
  GET_INTERESTS_FAIL,
  SUBMIT_BUSINESS,
  SUBMIT_BUSINESS_SUCCESS,
  SUBMIT_BUSINESS_FAIL,
  SUBMIT_MEDIA,
  SUBMIT_MEDIA_SUCCESS,
  SUBMIT_MEDIA_FAIL,
  DELETE_MEDIA,
  DELETE_MEDIA_SUCCESS,
  DELETE_MEDIA_FAIL
} from './types';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Keyboard, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import SInfo from 'react-native-sensitive-info';

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

const submitBusinessSuccess = (dispatch, onSubmit) => {
  dispatch({ type: SUBMIT_BUSINESS_SUCCESS });
  Keyboard.dismiss();
  onSubmit();
  Actions.pop();
  Toast.show('The business you just created is in process. Kindly wait for an approval.');
};

const submitBusinessFail = (dispatch, error) => {
  dispatch({ type: SUBMIT_BUSINESS_FAIL, payload: error });
  Toast.show(error);
}

export const submitBusiness = (
  media,
  name,
  nameAr,
  address,
  addressAr,
  email,
  phone,
  website,
  facebook,
  description,
  descriptionAr,
  country,
  city,
  category,
  subcategory,
  operationHours,
  price,
  flags,
  interests,
  lat,
  lng,
  business_id = '',
  onSubmit
) => {
  return async dispatch => {
    const { id, auth_key } = JSON.parse(await SInfo.getItem('user', {}));
    dispatch({ type: SUBMIT_BUSINESS });
    let data = new window.FormData();
    media && data.append('Media[file]"; filename="photo.jpg"', media);
    data.append('name', name),
    data.append('nameAr', nameAr),
    data.append('address', address),
    data.append('addressAr', addressAr),
    data.append('email', email),
    data.append('phone', phone),
    data.append('website', website),
    data.append('fb_page', facebook),
    data.append('description', description),
    data.append('descriptionAr', descriptionAr),
    data.append('country_id', country),
    data.append('city_id', city),
    data.append('category_id', subcategory || category),
    data.append('operation_hours', operationHours),
    data.append('price', price),
    data.append('flags_ids', flags),
    data.append('interests', interests),
    data.append('lat', lat),
    data.append('lng', lng)
    data.append('user_id', id);
    data.append('auth_key', auth_key);
    business_id && data.append('business_id', business_id);
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }
    api.post((business_id ? 'edit' : 'add') + '-business', data, config)
    .then(response => {
      const { status, errors } = response.data;
      if (status) {
        return submitBusinessFail(dispatch, errors);
      }
      return submitBusinessSuccess(dispatch, onSubmit);
    })
    .catch(() => submitBusinessFail(dispatch, 'Business submit failed'));
  };
};

const submitMediaSuccess = (dispatch, onSubmit) => {
  dispatch({ type: SUBMIT_MEDIA_SUCCESS });
  Keyboard.dismiss();
  onSubmit();
  Actions.pop();
};

const submitMediaFail = (dispatch, error) => {
  dispatch({ type: SUBMIT_MEDIA_FAIL, payload: error });
  Toast.show(error);
}

export const submitMedia = (business_id, media, type, caption, rating, onSubmit) => {
  return async dispatch => {
    const { id, auth_key } = JSON.parse(await SInfo.getItem('user', {}));
    dispatch({ type: SUBMIT_MEDIA });
    let data = new window.FormData();
    data.append('user_id', id);
    data.append('auth_key', auth_key);
    data.append('business_id', business_id);
    data.append('type', type);
    media && data.append('Media[file]"; filename="photo.jpg"', media);
    data.append('caption', caption);
    data.append('rating', rating);
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }
    api.post('add-media', data, config)
    .then(response => {
      const { status, errors } = response.data;
      if (status) {
        return submitMediaFail(dispatch, errors);
      }
      return submitMediaSuccess(dispatch, onSubmit);
    })
    .catch(() => submitMediaFail(dispatch, 'Media submit failed'));
  };
};

const deleteMediaSuccess = (dispatch, business_id, onSubmit) => {
  dispatch({ type: DELETE_MEDIA_SUCCESS });
  onSubmit();
};

const deleteMediaFail = (dispatch, error) => {
  dispatch({ type: DELETE_MEDIA_FAIL, payload: error });
  Toast.show(error);
}

export const deleteMedia = (media_id, business_id, onSubmit) => {
  return dispatch => {
    Alert.alert(
      '',
      'Are you sure you want to delete this image?',
      [
        { text: 'No' },
        {
          text: 'Yes',
          onPress: async () => {
            dispatch({ type: DELETE_MEDIA });
            const user = JSON.parse(await SInfo.getItem('user', {}));
            api.post('delete-media', {
              user_id: user.id,
              auth_key: user.auth_key,
              media_id
            })
            .then(response => {
              if (response.data.status) {
                return deleteMediaFail(dispatch, response.data.errors);
              }
              return deleteMediaSuccess(dispatch, business_id, onSubmit);
            })
            .catch(() => deleteMediaFail(dispatch, 'Logout failed'));
          }
        }
      ],
      { cancelable: false }
    );
  };
};
