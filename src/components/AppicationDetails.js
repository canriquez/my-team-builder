import React from "react";
import { connect } from "react-redux";
import styles from "../styles/ApplicationDetails.module.css";
import { cardObject, checkEval, currentEval } from "../helpers/componentHelp";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import {
  backendLikeDestroyAction,
  backendLikeChangeAction,
  backendLikeCreateAction,
} from "../actions/index";
import approved from "../assets/icons/approved.svg";
import declined from "../assets/icons/declined.svg";

const ApplicationDetails = ({
  match,
  secure,
  index_report,
  account,
  fireEraseEvalAction,
  fireChangeEvalAction,
  fireCreateEvalAction,
}) => {
  if (!index_report) {
    return <Redirect to="/" />;
  }
  const {
    application_id,
    app_id,
    app_name,
    app_age,
    app_date,
    likes,
    dislikes,
    job_id,
    job_name,
    job_date,
    job_age,
    job_author,
    avatar,
  } = cardObject(index_report[match.params.id]);
  const { evals } = account;

  const handleLikeAction = () => {
    const current_eval = currentEval(evals, account.id, application_id);
    console.log("===>>>>> in the handleLikeAction");
    console.log({ current_eval });

    if (!current_eval) {
      const payload = {
        token: secure.token,
        user_id: account.id,
        admin_id: account.id,
        application_id: application_id,
        evaluation: "like",
      };
      console.log({ payload });
      fireCreateEvalAction(payload);
      return;
    }

    if (current_eval.evaluation === 1) {
      const payload = {
        token: secure.token,
        id: current_eval.id,
        user_id: account.id,
      };
      console.log({ payload });
      fireEraseEvalAction(payload);
    }
    if (current_eval.evaluation === 0) {
      const payload = {
        token: secure.token,
        user_id: account.id,
        admin_id: account.id,
        evaluation_id: current_eval.id,
        evaluation: "like",
      };
      console.log({ payload });
      fireChangeEvalAction(payload);
    }
  };

  const handleDisLikeAction = () => {
    const current_eval = currentEval(evals, account.id, application_id);

    if (!current_eval) {
      const payload = {
        token: secure.token,
        user_id: account.id,
        admin_id: account.id,
        application_id: application_id,
        evaluation: "dislike",
      };
      console.log({ payload });
      fireCreateEvalAction(payload);
      return;
    }

    if (current_eval.evaluation === 1) {
      const payload = {
        token: secure.token,
        user_id: account.id,
        admin_id: account.id,
        evaluation_id: current_eval.id,
        evaluation: "dislike",
      };
      console.log({ payload });
      fireChangeEvalAction(payload);
    }

    if (current_eval.evaluation === 0) {
      const payload = {
        token: secure.token,
        id: current_eval.id,
        user_id: account.id,
      };
      console.log({ payload });
      fireEraseEvalAction(payload);
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeading}>
        <h1>{job_name}</h1>
        <h4>
          Job posted by: {job_author}, {job_age}
        </h4>
        <h4> Application Id: {application_id}</h4>
        <h4>Published on: {job_date}</h4>
        <h2>
          {checkEval(evals, account.id, application_id, 0) ? (
            <div className={styles.evalIcon}>
              <img className={styles.approvedIcon} src={declined} alt="Logo" />
            </div>
          ) : (
            ""
          )}
        </h2>
        <h2>
          {checkEval(evals, account.id, application_id, 1) ? (
            <div className={styles.evalIcon}>
              <img className={styles.approvedIcon} src={approved} alt="Logo" />
            </div>
          ) : (
            ""
          )}
        </h2>
      </div>
      <div className={styles.sectionTitle}>
        <h2>Applicant General Information</h2>
      </div>
      <div className={styles.applicantAvatar}>
        <img src={avatar} alt="user avatar" />
        <h2>{app_name}</h2>
        <h4>applied {app_age}</h4>
      </div>
      <h3>Evaluate this application</h3>
      <div className={styles.evaluation}>
        <a
          href="#"
          className={styles.likeButton}
          onClick={() => handleLikeAction()}
        >
          <button
            className="Rectangle-2 submit-btn base-button submit-disabled"
            type="button"
          >
            Approve
          </button>
        </a>
        <a
          href="#"
          className={styles.dislikeButton}
          onClick={() => handleDisLikeAction()}
        >
          <button
            className="Rectangle-2 submit-btn base-button submit-disabled"
            type="button"
          >
            Decline
          </button>
        </a>
      </div>
      <div className={styles.applicantInfoWrap}>
        <div className={styles.applicantData}>
          <h3>Application Date</h3>
          <h4>{app_date}</h4>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
  secure: state.secure,
  index_report: state.admin.index_report,
});

const mapDispatchToProps = (dispatch) => ({
  fireEraseEvalAction: (payload) => {
    dispatch(backendLikeDestroyAction(payload));
  },
  fireChangeEvalAction: (payload) => {
    dispatch(backendLikeChangeAction(payload));
  },
  fireCreateEvalAction: (payload) => {
    dispatch(backendLikeCreateAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetails);
