import {FETCH_DISCOVERY} from '../constant';

const initialState = {
  item: null,
};

export const discovery = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DISCOVERY:
      return {
        ...state,
        item: action.item,
      };

    default:
      return state;
  }
};
