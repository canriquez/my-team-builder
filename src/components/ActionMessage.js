import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ActionMessage.module.css";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import success from "../assets/icons/success.svg";
import error from "../assets/icons/error.svg";

const ActionMessage = ({ match, validCall }) => {
  if (!validCall) {
    return <Redirect to="/" />;
  }
  let mindex = parseInt(match.params.id, 10);
  const messages = [
    {
      message: "Congratulations, account created",
      button: "to Sign in.",
    },
    {
      message: "There was an error, please try again later...",
      button: "to Home",
    },
  ];

  return (
    <div className={styles.formblock}>
      <div className={styles.formwrap}>
        <div className={styles.formtitle}>
          <h1>{messages[mindex].message}</h1>
        </div>

        {mindex === 0 ? (
          <div className={styles.boxIcon}>
            <img className={styles.successIcon} src={success} alt="success" />
          </div>
        ) : (
          ""
        )}
        {mindex === 1 ? (
          <div className={styles.boxIcon}>
            <img className={styles.errorIcon} src={error} alt="error" />
          </div>
        ) : (
          ""
        )}

        {mindex === 0 ? (
          <Link className={styles.routerLink} to={`/signin`}>
            <button
              id="submit-btn"
              className={styles.actionButton}
              type="button"
            >
              {messages[mindex].button}
            </button>
          </Link>
        ) : (
          ""
        )}

        {mindex === 1 ? (
          <Link className={styles.routerLink} to={`/`}>
            <button
              id="submit-btn"
              className={styles.actionButton}
              type="button"
            >
              {messages[mindex].button}
            </button>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ActionMessage;
