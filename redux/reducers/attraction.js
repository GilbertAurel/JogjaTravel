import {
  ADD_SAVED_ATTRACTION,
  FETCH_SAVEDATTRACTION,
  DELETE_SAVED_ATTRACTION,
} from '../constant';

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

    case FETCH_SAVEDATTRACTION:
      return {
        ...state,
        savedAttraction: [...state.savedAttraction, ...action.savedAttraction],
      };

    case DELETE_SAVED_ATTRACTION:
      const data = [...state.savedAttraction];
      const attraction = action.savedAttraction;
      const newData = data.filter((doc) => doc.id != attraction.id);
      return {
        ...state,
        savedAttraction: [...newData],
      };

    default:
      return state;
  }
};
