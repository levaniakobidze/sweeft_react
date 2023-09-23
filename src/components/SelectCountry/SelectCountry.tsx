import { useEffect, useContext, useState } from "react";
import Select from "react-select";
import { MainContext } from "../../context/mainContext";
// const geolocation_api = "";
import { ContextTypes } from "../../context/mainContext";
import axios from "axios";
import { countryDataTypes } from "../../types/types";

const SelectCountry = () => {
  const { location, setLocation, setCountry } = useContext(
    MainContext
  ) as ContextTypes;
  const [countries, setCountries] = useState([]);

  const getCountry = async (name: string) => {
    try {
      const resp = await axios.get(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const {
        flag,
        capital,
        region,
        subregion,
        population,
        borders,
        currencies,
        continents,
      } = resp.data[0];
      setCountry({
        name: resp.data[0].name,
        flag: flag,
        capital: capital[0],
        region: region,
        subRegion: subregion,
        population: population,
        borders: borders,
        currencies: currencies,
        continent: continents[0],
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCountries = async () => {
    try {
      const resp = await axios.get(`https://restcountries.com/v3.1/all`);
      setCountries(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getLocation = async () => {
    console.log("happened");
    try {
      const resp = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
          location.latitude
        },${
          location.longitude
        }&key=${"AIzaSyCrUtxUzdnNfLOW4_akwJMHRij4P2t_668"}`
      );
      const results = resp.data.results;
      let country;
      for (let i = 0; i < results[0].address_components.length; i++) {
        for (
          let j = 0;
          j < results[0].address_components[i].types.length;
          j++
        ) {
          if (results[0].address_components[i].types[j] == "country") {
            country = results[0].address_components[i];
          }
        }
      }
      getCountry(country.long_name);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffects
  useEffect(() => {
    getAllCountries();
    // if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude);
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

    // } else {
    //   console.log("Geolocation is not supported by this browser.");
    // }
  }, []);
  useEffect(() => {
    if (location.latitude !== 0 && location.longitude !== 0) {
      getLocation();
    }
  }, [location]);

  return (
    <div>
      <Select
        options={countries.map((country: countryDataTypes) => {
          return { name: country.name.common, label: country.name.common };
        })}
      />
    </div>
  );
};

export default SelectCountry;
