import {ADD_SAVED_ATTRACTION} from '../constant';

const initialState = {
  savedAttraction: [],
};

export const attraction = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SAVED_ATTRACTION:
      return {
        ...state,
        savedAttraction: [...state.savedAttraction, action.savedAttraction],
      };

    default:
      return state;
  }
};
