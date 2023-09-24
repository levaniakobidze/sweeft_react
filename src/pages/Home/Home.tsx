// import React from 'react'

import { useParams } from "react-router-dom";
import DisplayCountry from "../../components/DisplayCountry/DisplayCountry";
import SelectCountry from "../../components/SelectCountry/SelectCountry";
import Navigation from "../../components/Navigation/Navigation";

const Home = () => {
  const { code } = useParams();
  return (
    <div>
      <SelectCountry code={code} />
      <DisplayCountry />
      <Navigation />
      Home
    </div>
  );
};

export default Home;
