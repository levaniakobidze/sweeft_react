import classes from "./Navigation.module.css";
import { Link, useParams, useLocation } from "react-router-dom";

const Navigation = () => {
  const { code } = useParams();
  const { pathname } = useLocation();
  return (
    <div className={classes.navigation_wrapper}>
      <Link
        className={`${classes.navigation_btn} ${
          pathname === `/${code}` && classes.btn_active
        } `}
        to={`/${code}`}
      >
        Currency exchange
      </Link>
      <Link
        className={`${classes.navigation_btn} ${
          pathname === `/${code}/airports` && classes.btn_active
        } `}
        to={`/${code}/airports`}
      >
        Airports
      </Link>
    </div>
  );
};

export default Navigation;
