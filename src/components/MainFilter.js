import React from "react";
import { PropTypes } from "prop-types";
import style from "../styles/MainFilter.module.css";
import mainFilterCat from "../config/appConfig";

const MainFilter = ({ changeMainFilter }) => {
  const handleChange = (e) => {
    let result;
    if (e.target.value === "all") {
      result = "all";
    } else {
      result = parseInt(e.target.value, 10);
    }
    changeMainFilter(result);
  };

  return (
    <div className={style.mainFilter}>
      <select className="categories" onChange={handleChange}>
        {mainFilterCat.map((cat, id) => (
          <option key={`opt_${id * 2}`} value={cat.api}>
            {cat.key}
          </option>
        ))}
      </select>
    </div>
  );
};

MainFilter.propTypes = {
  changeMainFilter: PropTypes.func.isRequired,
};

export default MainFilter;
