import {combineReducers} from 'redux';
import {attraction} from './attraction';
import {discovery} from './discovery';
import {news} from './news';
import {event} from './events';
import {USER_LOGOUT} from '../constant';

const appReducer = combineReducers({
  attractionState: attraction,
  discoveryState: discovery,
  newsState: news,
  eventState: event,
});

export default rootReducer = (state, action) => {
  return appReducer(action.type === USER_LOGOUT ? undefined : state, action);
};
