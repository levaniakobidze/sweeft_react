import { useParams } from "react-router-dom";
import DisplayCountry from "../../components/DisplayCountry/DisplayCountry";
import SelectCountry from "../../components/SelectCountry/SelectCountry";
import Navigation from "../../components/Navigation/Navigation";
import AirportsComponent from "../../components/AirportsComponent/AirportsComponent";

const Airports = () => {
  const { code } = useParams();
  return (
    <div>
      <SelectCountry code={code} />
      <DisplayCountry />
      <Navigation />
      <AirportsComponent />
    </div>
  );
};

export default Airports;
