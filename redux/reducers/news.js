import {FETCH_NEWS} from '../constant';

const initialState = {
  news: null,
};

export const news = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS:
      return {
        ...state,
        news: action.news,
      };

    default:
      return state;
  }
};
