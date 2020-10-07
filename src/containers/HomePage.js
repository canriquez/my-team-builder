import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../styles/HomePage.module.css";
import Button from "../components/HomeButton";
import logo from "../assets/icons/logo.svg";
import menu from "../assets/icons/menu.svg";
import AdminIndexList from "./AdminIndexList";

const HomePage = ({ secure, admin }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.buttonWrap}>
        <div className={styles.menuIcon}>
          <img src={menu} alt="Logo" id="ok-icon" />
        </div>

        {!secure.id ? (
          <>
            <Link className={styles.routerLink} to={`/signin`}>
              <Button name="Sign in" />
            </Link>
            <Link className={styles.routerLink} to={`/signup`}>
              <Button name="Sign up" />
            </Link>
          </>
        ) : (
          "USER LOGGED IN"
        )}
        {admin.index_report ? <AdminIndexList /> : ""}
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

const mapStateToProps = (state) => ({
  account: state.account,
  secure: state.secure,
  admin: state.admin,
});

export default connect(mapStateToProps, null)(HomePage);
