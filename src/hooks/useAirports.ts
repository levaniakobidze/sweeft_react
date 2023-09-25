// useAirports.js

import { useState } from "react";
import axios from "axios";
import { airportTypes, countryDataTypes } from "../types/types";

const useAirports = (country: countryDataTypes | null) => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const headers = {
    "X-Api-Key": "3ybGY/TW05G1ToDiHGcbNg==2VTn1GqIHfNY5DzJ",
  };

  const getAirports = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(
        `https://api.api-ninjas.com/v1/airports?country=${country?.cca2}`,
        { headers }
      );
      const filtered = resp.data.filter(
        (airport: airportTypes) => airport.iata !== ""
      );
      setAirports(filtered);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAirportsByName = async (searchTerm: string) => {
    setLoading(true);
    try {
      const resp = await axios.get(
        `https://api.api-ninjas.com/v1/airports?country=${country?.cca2}&name=${searchTerm}`,
        { headers }
      );
      setAirports(resp.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    airports,
    loading,
    getAirports,
    getAirportsByName,
  };
};

export default useAirports;
