import { useContext, useEffect } from "react";
import classes from "./AirportsComponent.module.css";
import { ContextTypes, MainContext } from "../../context/mainContext";
import { airportTypes } from "../../types/types";
import Loading from "../Loading/Loading";
import useAirports from "../../hooks/useAirports";

const AirportsComponent = () => {
  const { country } = useContext(MainContext) as ContextTypes;
  const { airports, loading, getAirports, getAirportsByName } =
    useAirports(country);
  let timer: number | undefined;

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
  useEffect(() => {
    getAirports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

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
        {loading && <Loading />}
      </ul>
    </div>
  );
};

export default AirportsComponent;
