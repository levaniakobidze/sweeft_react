import axios from "axios";
import { LocationTypes } from "../types/types";
export const getLocation = async (
  getCountryByName: (country: string) => void,
  location: LocationTypes
) => {
  try {
    const resp = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        location.latitude
      },${location.longitude}&key=${"AIzaSyCrUtxUzdnNfLOW4_akwJMHRij4P2t_668"}`
    );
    const results = resp.data.results;
    let country;
    for (let i = 0; i < results[0].address_components.length; i++) {
      for (let j = 0; j < results[0].address_components[i].types.length; j++) {
        if (results[0].address_components[i].types[j] == "country") {
          country = results[0].address_components[i];
        }
      }
    }
    getCountryByName(country.long_name);
  } catch (error) {
    console.log(error);
  }
};
