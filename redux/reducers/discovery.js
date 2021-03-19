import {FETCH_CURRENT_LOCATION, FETCH_DISCOVERY} from '../constant';

const initialState = {
  item: null,
  currentLocation: {},
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

    default:
      return state;
  }
};
