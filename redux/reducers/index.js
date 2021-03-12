import {combineReducers} from 'redux';
import {attraction} from './attraction';
import {discovery} from './discovery';

export default combineReducers({
  attractionState: attraction,
  discoveryState: discovery,
});
