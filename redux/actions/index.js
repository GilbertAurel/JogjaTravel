import {
  ADD_SAVED_ATTRACTION,
  DELETE_SAVED_ATTRACTION,
  FETCH_CURRENT_LOCATION,
  FETCH_DISCOVERY,
} from '../constant';

export function saveAttraction(attraction) {
  return (dispatch) => {
    dispatch({type: ADD_SAVED_ATTRACTION, savedAttraction: attraction});
  };
}

export function deleteAttraction(attraction) {
  return (dispatch) => {
    dispatch({type: DELETE_SAVED_ATTRACTION, saveAttraction: attraction});
  };
}

export function fetchDiscovery(attraction) {
  return (dispatch) => {
    dispatch({type: FETCH_DISCOVERY, item: attraction});
  };
}

export function fetchCurrentLocation(coordinate) {
  return (dispatch) => {
    dispatch({
      type: FETCH_CURRENT_LOCATION,
      currentLocation: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      },
    });
  };
}
