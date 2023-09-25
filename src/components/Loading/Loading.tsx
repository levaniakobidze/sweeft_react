import { Fragment } from "react";
import "./Loading.css";
const Loading = () => {
  return (
    <Fragment>
      <div className="skeleton">
        <div className="skeleton-left">
          <div className="line h17 w40 m10"></div>
          <div className="line"></div>
          <div className="line h8 w50"></div>
          <div className="line w75"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default Loading;
