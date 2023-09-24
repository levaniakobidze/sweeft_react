import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./AirportsComponent.module.css";

const AirportsComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [airports, setAirports] = useState([]);
  const getAirports = async () => {
    try {
      const resp = await axios.get(
        "https://api.api-ninjas.com/v1/airports?country=ge",
        {
          headers: {
            "X-Api-Key": "3ybGY/TW05G1ToDiHGcbNg==2VTn1GqIHfNY5DzJ",
          },
        }
      );
      setAirports(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAirports();
  }, []);

  return (
    <div className={classes.airports_wrapper}>
      <h1 className={classes.airports_title}>Airports</h1>
      <input
        className={classes.airports_search_input}
        type="text"
        placeholder="Search for airports"
      />
    </div>
  );
};

export default AirportsComponent;
