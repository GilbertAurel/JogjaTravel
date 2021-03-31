import {combineReducers} from 'redux';
import {attraction} from './attraction';
import {discovery} from './discovery';
import {news} from './news';
import {event} from './events';

export default combineReducers({
  attractionState: attraction,
  discoveryState: discovery,
  newsState: news,
  eventState: event,
});
