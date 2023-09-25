// import React from 'react'

import { useParams } from "react-router-dom";
import DisplayCountry from "../../components/DisplayCountry/DisplayCountry";
import SelectCountry from "../../components/SelectCountry/SelectCountry";
import Navigation from "../../components/Navigation/Navigation";
import CurrencyExchange from "../../components/CurrencyExchange/CurrencyExchange";

const Home = () => {
  const { code } = useParams();
  return (
    <div className="container">
      <SelectCountry code={code} />
      <DisplayCountry />
      <Navigation />
      <CurrencyExchange />
    </div>
  );
};

export default Home;
