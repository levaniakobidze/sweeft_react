import { Fragment, useContext, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { ContextTypes, MainContext } from "./context/mainContext";
import axios from "axios";
import { getGeoLocation } from "./utils/geoLocation";
import { getLocation } from "./utils/location";
const App = () => {
  const { setLocation, location } = useContext(MainContext) as ContextTypes;
  const navigate = useNavigate();

  const getCountryByName = async (name: string) => {
    try {
      const resp = await axios.get(
        `https://restcountries.com/v3.1/name/${name}`
      );
      navigate(resp.data[0].cca3);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGeoLocation(setLocation);
  }, []);

  useEffect(() => {
    if (location.latitude !== 0 && location.longitude !== 0) {
      getLocation(getCountryByName, location);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Fragment>
      <Routes>
        <Route path="/:code" element={<Home />} />
      </Routes>
    </Fragment>
  );
};

export default App;
