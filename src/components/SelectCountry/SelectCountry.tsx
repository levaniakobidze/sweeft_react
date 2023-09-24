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
        currencies,
        continents,
        cca3,
      } = resp.data[0];
      setCountry({
        name: resp.data[0].name,
        flag: flag,
        capital: capital[0],
        region: region,
        subRegion: subregion,
        population: population,
        borders: borders,
        currencies: currencies,
        continent: continents[0],
        cca3: cca3,
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
