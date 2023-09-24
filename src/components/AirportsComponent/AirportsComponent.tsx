import axios from "axios";
import { useContext, useEffect, useState } from "react";
import classes from "./AirportsComponent.module.css";
import { ContextTypes, MainContext } from "../../context/mainContext";
import { airportTypes } from "../../types/types";

const AirportsComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [airports, setAirports] = useState([]);
  const { country } = useContext(MainContext) as ContextTypes;
  let timer: number | undefined;
  const headers = {
    "X-Api-Key": "3ybGY/TW05G1ToDiHGcbNg==2VTn1GqIHfNY5DzJ",
  };
  const getAirports = async () => {
    try {
      const resp = await axios.get(
        `https://api.api-ninjas.com/v1/airports?country=${country?.cca2}`,
        {
          headers,
        }
      );
      setAirports(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAirportsByName = async (searchTerm: string) => {
    try {
      const resp = await axios.get(
        `https://api.api-ninjas.com/v1/airports?country=${country?.cca2}&name=${searchTerm}`,
        {
          headers,
        }
      );
      setAirports(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAirports();
  }, [country]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (search) {
        getAirportsByName(search);
      } else {
        getAirports();
      }
    }, 500);
  };

  return (
    <div className={classes.airports_wrapper}>
      <h1 className={classes.airports_title}>Airports</h1>
      <input
        className={classes.airports_search_input}
        type="text"
        placeholder="Search for airports"
        onChange={handleChange}
      />
      <ul className={classes.airport_list}>
        {airports?.map((airport: airportTypes, index) => {
          if (airport.iata) {
            return (
              <li key={index}>
                {airport?.iata}-{airport.name}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default AirportsComponent;
