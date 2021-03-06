import axios from "axios";
import {
  GOOGLE_PLACES_API_URL,
  GOOGLE_PLACES_API_KEY
} from "../constants/constants";
import NodeGeocoder from "node-geocoder";
import { locationToLatLong } from "../utilities/locationToLatLong";

var options = {
  provider: "google",
  httpAdapter: "https",
  apiKey: `${GOOGLE_PLACES_API_KEY}`,
  formatter: null
};

export function search(criteria, radius, location) {
  let request;
  var geocoder = NodeGeocoder(options);
  let coords;

  return dispatch => {
    locationToLatLong(location).then(response => {
      console.log(response);
      dispatch(requestGooglePlaces());
      request = axios
        .get(
          `${GOOGLE_PLACES_API_URL}location=${response.lat},${
            response.lng
          }&radius=${radius}&type=${criteria}&key=${GOOGLE_PLACES_API_KEY}`,
          { headers: { "Access-Control-Allow-Origin": "*" } }
        )
        .then(response => {
          console.log(response);
          dispatch(getListings(response, criteria));
          dispatch(receivedGooglePlaces());
        });
    });
  };
}

export function searchPhotos(listing) {
  return dispatch => {
    listing.photos.map(photo => {
      return axios
        .get(
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
            photo.photo_reference
          }&key=${GOOGLE_PLACES_API_KEY}`
        )
        .then(response => {
          dispatch(loadPhoto(response));
        })
        .catch(ex => {
          dispatch(loadPhotosFailure(ex));
        });
    });
  };
}

export const loadPhoto = photo => {
  return {
    type: "REQUEST_PHOTOS",
    payload: photo
  };
};

export const loadPhotosFailure = ex => {
  return {
    type: "LOAD_PHOTOS_FAILURE",
    payload: ex
  };
};

export const requestGooglePlaces = () => {
  return {
    type: "REQUEST_GOOGLE_PLACES"
  };
};

export const noPictures = () => {
  return {
    type: "NO_PICTURES_FOUND"
  };
};

export const receivedGooglePlaces = () => {
  return {
    type: "RECEIVED_GOOGLE_PLACES"
  };
};

export const requestHome = () => {
  return {
    type: "REQUEST_HOME"
  };
};

export const requestRedirect = () => {
  return {
    type: "REQUEST_REDIRECT_TO_LISTINGS"
  };
};
export const requestPreferences = () => {
  return {
    type: "REQUEST_PREFERENCES"
  };
};

export const requestListings = () => {
  return {
    type: "REQUEST_LISTINGS"
  };
};

export const requestOpenModal = () => {
  return {
    type: "REQUEST_OPEN_MODAL"
  };
};

export const requestCloseModal = () => {
  return {
    type: "REQUEST_CLOSE_MODAL"
  };
};

export const getListings = (listings, criteria) => {
  return {
    type: `LIST_${criteria}`,
    payload: listings.data.results
  };
};

export const finishedFetching = () => {
  return {
    type: "FINISHED_FETCHING"
  };
};

export const listAll = listings => {
  return {
    type: "GET_ALL",
    payload: listings
  };
};
