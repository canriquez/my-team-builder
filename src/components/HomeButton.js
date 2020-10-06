import React from "react";
import styles from "../styles/HomeButton.module.css";

const HomeButton = ({ name }) => {
  return (
    <button id="submit-btn" className={styles.homeButton} type="button">
      {name}
    </button>
  );
};

export default HomeButton;
