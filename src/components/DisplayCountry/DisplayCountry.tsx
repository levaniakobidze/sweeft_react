import classes from "./DisplayCountry.module.css";
import { useContext } from "react";
import { ContextTypes, MainContext } from "../../context/mainContext";

const DisplayCountry = () => {
  const { country } = useContext(MainContext) as ContextTypes;

  return (
    <div className={classes.main_wrapper}>
      <div className={classes.country_name}>
        {country?.name?.official}
        <span className={classes.country_flag}>{country?.flag}</span>
      </div>
      <div className={classes.country_info_cont}>
        <div>
          <ul className={classes.list}>
            <li>
              <span className={classes.key}>Capital:</span>
              <span className={classes.value}>{country?.capital}</span>
            </li>
            <li>
              <span className={classes.key}>currency:</span>
              <span className={classes.value}>
                {country?.currencies?.name}({country?.currencies?.symbol})
              </span>
            </li>
            <li>
              <span className={classes.key}>region:</span>
              <span className={classes.value}>
                {country?.region}, {country?.subRegion}
              </span>
            </li>
          </ul>
        </div>
        <div>
          <ul className={classes.list}>
            <li>
              <span className={classes.key}>Continent:</span>
              <span className={classes.value}>{country?.continent}</span>
            </li>
            <li>
              <span className={classes.key}>Population:</span>
              <span className={classes.value}>{country?.population}</span>
            </li>
            <li>
              <span className={classes.key}>Borders:</span>
              {country?.borders?.map((bordCountry, index: number) => {
                return (
                  <span className={classes.value} key={index}>
                    {bordCountry}
                  </span>
                );
              })}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DisplayCountry;
