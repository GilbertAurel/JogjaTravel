import {
  ADD_SAVED_ATTRACTION,
  DELETE_SAVED_ATTRACTION,
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

export function fetchDiscovery() {
  const url = 'http://10.0.2.2:8080/test';

  return (dispatch) => {
    console.log('fetching data');
    fetch(url)
      .then((response) => response.json())
      .then((json) => dispatch({type: FETCH_DISCOVERY, item: json}))
      .catch((error) => console.log(error));
  };
}
