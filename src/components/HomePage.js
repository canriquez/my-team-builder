import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  return (
    <div>
      <Link className={styles.routerLink} to={`/signup`}>
        <h1>Sign in</h1>
      </Link>
      <h1>Sign up</h1>
    </div>
  );
};

export default HomePage;
