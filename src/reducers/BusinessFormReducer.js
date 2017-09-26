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
} from '../actions/types';

const INITIAL_STATE = {
  countries: [],
  cities: [],
  categories: [],
  subcategories: [],
  flags: [],
  interests: [],
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
  country: '',
  city: '',
  category: '',
  subcategory: '',
  operationHours: '',
  price: '',
  selectedFlags: [],
  selectedInterests: [],
  region: {
    latitude: 30.042,
    longitude: 31.252,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
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
      return { ...state, cities: [], city: '', error: '' };
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
      return { ...state, subcategories: [], subcategory: '', error: '' };
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
    default:
      return state;
  }
};
