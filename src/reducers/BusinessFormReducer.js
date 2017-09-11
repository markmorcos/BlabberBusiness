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
  GET_SUBCATEGORIES_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  categories: [],
  subcategories: [],
  countries: [],
  cities: [],
  media: '',
  name: '',
  nameAr: '',
  address: '',
  addressAr: '',
  phone: '',
  website: '',
  facebook: '',
  description: '',
  descriptionAr: '',
  media: '',
  location: '',
  country: '',
  city: '',
  category: '',
  subcategory: '',
  operationHours: '',
  price: '',
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROP_CHANGED:
      return { ...state, [action.payload.key]: action.payload.value };
    case GET_COUNTRIES:
      return { ...state, error: '' };
    case GET_COUNTRIES_SUCCESS:
      return { ...state, countries: action.payload, error: '' };
    case GET_COUNTRIES_FAIL:
      return { ...state, error: action.payload };
    case GET_CITIES:
      return { ...state, cities: [], error: '' };
    case GET_CITIES_SUCCESS:
      return { ...state, cities: action.payload, error: '' };
    case GET_CITIES_FAIL:
      return { ...state, error: action.payload };
    case GET_CATEGORIES:
      return { ...state, error: '' };
    case GET_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, error: '' };
    case GET_CATEGORIES_FAIL:
      return { ...state, error: action.payload };
    case GET_SUBCATEGORIES:
      return { ...state, subcategories: [], error: '' };
    case GET_SUBCATEGORIES_SUCCESS:
      return { ...state, subcategories: action.payload, error: '' };
    case GET_SUBCATEGORIES_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
