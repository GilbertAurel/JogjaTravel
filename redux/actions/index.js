import {
  ADD_SAVED_ATTRACTION,
  DELETE_SAVED_ATTRACTION,
  FETCH_CURRENT_LOCATION,
  FETCH_DISCOVERY,
  FETCH_POPULAR_ATTRACTIONS,
  FETCH_NEWS,
  FETCH_EVENTS,
} from '../constant';

import {SERVER} from '../../constants';

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

export function fetchDiscovery() {
  const url = `${SERVER}/attractions/attraction.json`;

  return (dispatch) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        return dispatch({type: FETCH_DISCOVERY, item: json});
      })
      .catch((error) => console.log(error));
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

export function fetchPopularAtractions() {
  const url = `${SERVER}/populars/populars.json`;

  return (dispatch) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        return dispatch({type: FETCH_POPULAR_ATTRACTIONS, item: json});
      })
      .catch((error) => console.log(error));
  };
}

export function fetchNews() {
  const url = `${SERVER}/news/news.json`;

  return (dispatch) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        return dispatch({type: FETCH_NEWS, news: json});
      })
      .catch((error) => console.log(error));
  };
}

export function fetchEvents() {
  const url = `${SERVER}/events/events.json`;

  return (dispatch) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        return dispatch({type: FETCH_EVENTS, event: json});
      })
      .catch((error) => console.log(error));
  };
}
