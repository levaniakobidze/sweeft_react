// import React from 'react'

import { useParams } from "react-router-dom";
import DisplayCountry from "../../components/DisplayCountry/DisplayCountry";
import SelectCountry from "../../components/SelectCountry/SelectCountry";

const Home = () => {
  const { code } = useParams();
  console.log(code);
  return (
    <div>
      <SelectCountry code={code} />
      <DisplayCountry />
      Home
    </div>
  );
};

export default Home;
