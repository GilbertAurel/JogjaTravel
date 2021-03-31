import {FETCH_EVENTS} from '../constant';

const initialState = {
  event: null,
};

export const event = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        event: action.event,
      };

    default:
      return state;
  }
};
