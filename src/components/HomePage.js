import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/HomePage.module.css";
import Button from "./HomeButton";

const HomePage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.buttonWrap}>
        <Link className={styles.routerLink} to={`/signin`}>
          <Button name="Sign in" />
        </Link>
        <Link className={styles.routerLink} to={`/signup`}>
          <Button name="Sign up" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
