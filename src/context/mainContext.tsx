import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { countryDataTypes, LocationTypes } from "../types/types";

interface Props {
  children: ReactNode;
}

export interface ContextTypes {
  location: LocationTypes;
  setLocation: Dispatch<SetStateAction<LocationTypes>>;
  country: countryDataTypes | null;
  setCountry: Dispatch<SetStateAction<countryDataTypes>>;
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
  return (
    <MainContext.Provider
      value={{ location, setLocation, country, setCountry }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default ContextProvider;
