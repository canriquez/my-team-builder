import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/HomePage.module.css";
import Button from "./HomeButton";
import logo from "../assets/icons/logo.svg";
import menu from "../assets/icons/menu.svg";

const HomePage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.buttonWrap}>
        <div className={styles.menuIcon}>
          <img src={menu} alt="Logo" id="ok-icon" />
        </div>
        <Link className={styles.routerLink} to={`/signin`}>
          <Button name="Sign in" />
        </Link>
        <Link className={styles.routerLink} to={`/signup`}>
          <Button name="Sign up" />
        </Link>
      </div>
      <div className={styles.brandWrapper}>
        <div className={styles.logoWrap}>
          <img src={logo} alt="Logo" id="ok-icon" />
        </div>
        <h1 className={styles.brand}>My Team Builder</h1>
      </div>
    </div>
  );
};

export default HomePage;
