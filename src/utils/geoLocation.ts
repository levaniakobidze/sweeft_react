import { Dispatch, SetStateAction } from "react";
import { LocationTypes } from "../types/types";
export const getGeoLocation = (
  setLocation: Dispatch<SetStateAction<LocationTypes>>
): void => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.error("The request to get user location timed out.");
          break;

        default:
          console.error("An unspecified error occurred.");
      }
    }
  );
};
