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
  SUBMIT_BUSINESS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  countries: [],
  cities: [],
  categories: [],
  subcategories: [],
  flags: [],
  interests: [],
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
    case GET_FLAGS:
      return { ...state, error: '' };
    case GET_FLAGS_SUCCESS:
      return { ...state, flags: action.payload, error: '' };
    case GET_FLAGS_FAIL:
      return { ...state, error: action.payload };
    case GET_INTERESTS:
      return { ...state, error: '' };
    case GET_INTERESTS_SUCCESS:
      return { ...state, interests: action.payload, error: '' };
    case GET_INTERESTS_FAIL:
      return { ...state, error: action.payload };
    case SUBMIT_BUSINESS:
      return { ...state, loading: true, error: '' };
    case SUBMIT_BUSINESS_SUCCESS:
      return { ...state, loading: false, error: '' };
    case SUBMIT_BUSINESS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
