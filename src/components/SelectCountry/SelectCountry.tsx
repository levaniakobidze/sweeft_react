import React, { useEffect, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MainContext, ContextTypes } from "../../context/mainContext";
import { customSelectCountryStyles } from "../../styles/selectStyles";
import { countryDataTypes } from "../../types/types";

interface SelectCountryProps {
  code: string | undefined;
}

const SelectCountry: React.FC<SelectCountryProps> = ({ code }) => {
  const {
    country,
    setCountry,
    allCountries,
    cashedCountries,
    setCashedCountries,
  } = useContext(MainContext) as ContextTypes;
  const navigate = useNavigate();

  const getCountry = async () => {
    const isCashed = cashedCountries?.find(
      (cashedCountry: countryDataTypes) => {
        return cashedCountry.cca3 === code;
      }
    );
    if (!isCashed) {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${code}`
        );
        const countryData = response.data[0];
        const currencies = countryData.currencies || {};
        const currencyValues = Object.values(currencies) as {
          name: string;
          symbol: string;
        }[];
        const countryInfo = {
          name: countryData.name,
          flag: countryData.flag,
          capital: countryData.capital[0],
          region: countryData.region,
          subRegion: countryData.subregion,
          population: countryData.population,
          borders: countryData.borders,
          currencyCode: Object.keys(currencies)[0],
          currencies: {
            name: currencyValues[0]?.name,
            symbol: currencyValues[0]?.symbol,
          },
          continent: countryData.continents[0],
          cca3: countryData.cca3,
          cca2: countryData.cca2,
        };
        setCountry(countryInfo);
        setCashedCountries((prev) => [...(prev || []), countryInfo]);
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    } else {
      setCountry(isCashed);
    }
  };

  useEffect(() => {
    if (code) {
      getCountry();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectChange = (selectedOption: any) => {
    navigate(`/${selectedOption.name}`);
  };

  // console.log(cashedCountries, "cashed");

  return (
    <div>
      {country?.name && (
        <Select
          styles={customSelectCountryStyles}
          options={allCountries?.map((country: countryDataTypes) => {
            return { name: country.cca3, label: country.name.common };
          })}
          onChange={handleSelectChange}
          defaultValue={{
            name: country?.name.common,
            label: country?.name.common,
          }}
        />
      )}
    </div>
  );
};

export default SelectCountry;
