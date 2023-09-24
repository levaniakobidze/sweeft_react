import { useContext } from "react";
import classes from "./CurrencyExchange.module.css";
import Select from "react-select";
import { ContextTypes, MainContext } from "../../context/mainContext";
import { countryDataTypes } from "../../types/types";

const CurrencyExchange = () => {
  const { allCountries } = useContext(MainContext) as ContextTypes;
  return (
    <div className={classes.currency_wrapper}>
      <h1 className={classes.currency_title}>Currency Exchange</h1>
      <Select
        options={allCountries?.map((country: countryDataTypes) => {
          return { name: country.cca3, label: country.name.common };
        })}
        // onChange={handleSelectChange}
      />
      <div className={classes.currency_inputs_container}>
        <input className={classes.prompt_input} type="number" placeholder="0" />
        =
        <input
          className={classes.display_input}
          type="number"
          disabled
          placeholder="0.00"
        />
      </div>
    </div>
  );
};

export default CurrencyExchange;
