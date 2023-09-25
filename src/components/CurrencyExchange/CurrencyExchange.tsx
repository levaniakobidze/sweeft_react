import { useContext, useEffect, useState } from "react";
import classes from "./CurrencyExchange.module.css";
import Select from "react-select";
import { ContextTypes, MainContext } from "../../context/mainContext";
import { countryDataTypes } from "../../types/types";
import axios from "axios";
import { customExchangeStyles } from "../../styles/selectStyles";

const CurrencyExchange = () => {
  const { allCountries, country } = useContext(MainContext) as ContextTypes;
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [calculated, setCalculated] = useState<number | string>("");
  const [currencySymbol, setCurrencySymbol] = useState<string | undefined>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectChange = (e: any) => {
    setSelectedCountry(e.currency);
    setCurrencySymbol(e.symbol.symbol);
  };

  const fetchExchangeRate = async (code: string | null | undefined) => {
    try {
      const resp = await axios.get(
        `https://api.exchangerate.host/latest?base=${code}`
      );
      // Get exchangeRate from the api response that matchs to the selected countryCode
      const currencyCode = country?.currencyCode;
      const rate = currencyCode
        ? resp.data.rates[country?.currencyCode]
        : undefined;
      setExchangeRate(rate);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const calculated = Number(input) / exchangeRate;
    const fixed = calculated.toFixed(2);
    setCalculated(Number(fixed));
  };

  useEffect(() => {
    const code = country?.currencyCode;
    fetchExchangeRate(code);
    setCurrencySymbol(country?.currencies?.symbol);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  useEffect(() => {
    fetchExchangeRate(selectedCountry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  const rate = 1 / exchangeRate;
  const str = rate.toFixed(2).toString();
  return (
    <div className={classes.currency_wrapper}>
      <h1 className={classes.currency_title}>Currency Exchange</h1>
      {country?.name && (
        <Select
          options={allCountries?.map((country: countryDataTypes) => {
            const currencies = country.currencies || {};
            return {
              name: country.cca3,
              label: country.name.common,
              currency: Object.keys(currencies)[0],
              symbol: Object.values(currencies)[0],
            };
          })}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "hotpink",
              primary: "white   ",
            },
          })}
          styles={customExchangeStyles}
          defaultValue={{
            name: country?.name.common,
            label: country?.name.common,
          }}
          onChange={handleSelectChange}
        />
      )}
      <div className={classes.currency_inputs_container}>
        <div className={classes.currency_inner_cont}>
          <span>{country?.currencies?.symbol}</span>
          <input
            onChange={calculateRate}
            className={classes.prompt_input}
            type="number"
            placeholder="0"
          />
        </div>
        =
        <div className={classes.currency_inner_cont}>
          <span>{currencySymbol}</span>
          <input
            className={classes.display_input}
            type="number"
            disabled
            placeholder={str}
            value={calculated}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyExchange;
