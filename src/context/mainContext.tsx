import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { countryDataTypes, LocationTypes } from "../types/types";
import axios from "axios";

interface Props {
  children: ReactNode;
}

export interface ContextTypes {
  location: LocationTypes;
  setLocation: Dispatch<SetStateAction<LocationTypes>>;
  country: countryDataTypes | null;
  setCountry: Dispatch<SetStateAction<countryDataTypes>>;
  allCountries: [countryDataTypes] | null;
  setAllCountries: Dispatch<SetStateAction<[countryDataTypes] | null>>;
}

export const MainContext = createContext<ContextTypes | null>(null);

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [location, setLocation] = useState<LocationTypes>({
    latitude: 0,
    longitude: 0,
  });
  const [country, setCountry] = useState<countryDataTypes>(
    {} as countryDataTypes
  );
  const [allCountries, setAllCountries] = useState<[countryDataTypes] | null>(
    null
  );

  // Function To Fetch All countries
  const getAllCountries = async () => {
    try {
      const resp = await axios.get(`https://restcountries.com/v3.1/all`);
      setAllCountries(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCountries();
  }, []);
  return (
    <MainContext.Provider
      value={{
        location,
        setLocation,
        country,
        setCountry,
        allCountries,
        setAllCountries,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default ContextProvider;
