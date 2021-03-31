import {
  FETCH_CURRENT_LOCATION,
  FETCH_DISCOVERY,
  FETCH_POPULAR_ATTRACTIONS,
} from '../constant';

const initialState = {
  item: null,
  currentLocation: {},
  popularAttractions: null,
};

export const discovery = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DISCOVERY:
      return {
        ...state,
        item: action.item,
      };

    case FETCH_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.currentLocation,
      };

    case FETCH_POPULAR_ATTRACTIONS:
      return {
        ...state,
        popularAttractions: action.item,
      };

    default:
      return state;
  }
};
