import { useEffect, useContext } from "react";
import Select from "react-select";
import { MainContext } from "../../context/mainContext";
import { ContextTypes } from "../../context/mainContext";
import axios from "axios";
import { countryDataTypes } from "../../types/types";
import { useNavigate } from "react-router-dom";

const SelectCountry = ({ code }: { code: string | undefined }) => {
  const { setCountry, allCountries } = useContext(MainContext) as ContextTypes;
  const navigate = useNavigate();
  const getCountry = async () => {
    try {
      const resp = await axios.get(
        `https://restcountries.com/v3.1/alpha/${code}`
      );
      const {
        flag,
        capital,
        region,
        subregion,
        population,
        borders,
        continents,
        cca3,
        cca2,
        currencies,
      } = resp.data[0];
      const currencyValues = Object.values(currencies) as {
        name: string;
        symbol: string;
      }[];
      setCountry({
        name: resp.data[0].name,
        flag: flag,
        capital: capital[0],
        region: region,
        subRegion: subregion,
        population: population,
        borders: borders,
        currencyCode: Object.keys(currencies)[0],
        currencies: {
          name: currencyValues[0]?.name,
          symbol: currencyValues[0]?.symbol,
        },

        continent: continents[0],
        cca3: cca3,
        cca2: cca2,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountry();
  }, [code]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectChange = (e: any) => {
    navigate(`/${e.name}`);
  };

  return (
    <div>
      <Select
        options={allCountries?.map((country: countryDataTypes) => {
          return { name: country.cca3, label: country.name.common };
        })}
        onChange={handleSelectChange}
      />
    </div>
  );
};

export default SelectCountry;
