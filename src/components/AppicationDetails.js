/*  eslint-disable  camelcase, jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styles from '../styles/ApplicationDetails.module.css';
import { cardObject, checkEval, currentEval } from '../helpers/componentHelp';

import {
  backendLikeDestroyAction,
  backendLikeChangeAction,
  backendLikeCreateAction,
} from '../actions/index';
import approved from '../assets/icons/approved.svg';
import declined from '../assets/icons/declined.svg';
import { ReactComponent as GoBack } from '../assets/icons/pagePrev.svg';

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
  // eslint-disable-next-line
  const selectedApplication = index_report.filter((record) => {
    return record.application_id === parseInt(match.params.id, 10);
  });
  const {
    application_id,
    app_name,
    app_age,
    app_date,
    job_name,
    job_date,
    job_age,
    job_author,
    avatar,
  } = cardObject(selectedApplication[0]);
  const { evals } = account;

  const handleLikeAction = () => {
    const current_eval = currentEval(evals, account.id, application_id);

    if (!current_eval) {
      const payload = {
        token: secure.token,
        user_id: account.id,
        admin_id: account.id,
        application_id,
        evaluation: 'like',
      };
      fireCreateEvalAction(payload);
      return;
    }

    if (current_eval.evaluation === 1) {
      const payload = {
        token: secure.token,
        id: current_eval.id,
        user_id: account.id,
      };
      fireEraseEvalAction(payload);
    }
    if (current_eval.evaluation === 0) {
      const payload = {
        token: secure.token,
        user_id: account.id,
        admin_id: account.id,
        evaluation_id: current_eval.id,
        evaluation: 'like',
      };
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
        application_id,
        evaluation: 'dislike',
      };
      fireCreateEvalAction(payload);
      return;
    }

    if (current_eval.evaluation === 1) {
      const payload = {
        token: secure.token,
        user_id: account.id,
        admin_id: account.id,
        evaluation_id: current_eval.id,
        evaluation: 'dislike',
      };
      fireChangeEvalAction(payload);
    }

    if (current_eval.evaluation === 0) {
      const payload = {
        token: secure.token,
        id: current_eval.id,
        user_id: account.id,
      };
      fireEraseEvalAction(payload);
    }
  };

  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.menuIcon} />
        <Link
          to={{
            pathname: '/',
          }}
        >
          <GoBack className={styles.goBack} />
        </Link>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardHeading}>
          <h1>{job_name}</h1>
          <h4>
            Job posted by:
            {' '}
            {job_author}
            ,
            {' '}
            {job_age}
          </h4>
          <h4>
            {' '}
            Application Id:
            {application_id}
          </h4>
          <h4>
            Published on:
            {job_date}
          </h4>

          {checkEval(evals, account.id, application_id, 0) ? (
            <div className={styles.evalIcon}>
              <img className={styles.approvedIcon} src={declined} alt="Logo" />
            </div>
          ) : (
            ''
          )}
          {checkEval(evals, account.id, application_id, 1) ? (
            <div className={styles.evalIcon}>
              <img className={styles.approvedIcon} src={approved} alt="Logo" />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={styles.sectionTitle}>
          <h2>Applicant General Information</h2>
        </div>
        <div className={styles.applicantAvatar}>
          <img src={avatar} alt="user avatar" />
          <h2>{app_name}</h2>
          <h4>
            applied
            {app_age}
          </h4>
        </div>
        <h3>Evaluate this application</h3>
        <div className={styles.evaluation}>
          <a
            href="#"
            className={styles.likeButton}
            onClick={() => handleLikeAction()}
          >
            <button
              className="Rectangle-2 submit-btn base-button"
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
              className="Rectangle-2 submit-btn base-button"
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
    </>
  );
};

const mapStateToProps = state => ({
  account: state.account,
  secure: state.secure,
  index_report: state.admin.index_report,
});

const mapDispatchToProps = dispatch => ({
  fireEraseEvalAction: payload => {
    dispatch(backendLikeDestroyAction(payload));
  },
  fireChangeEvalAction: payload => {
    dispatch(backendLikeChangeAction(payload));
  },
  fireCreateEvalAction: payload => {
    dispatch(backendLikeCreateAction(payload));
  },
});

ApplicationDetails.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  secure: PropTypes.shape({
    id: PropTypes.number.isRequired,
    now: PropTypes.string.isRequired,
    then: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
  index_report: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  account: PropTypes.shape({
    id: PropTypes.number.isRequired,
    evals: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
      .isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    tokenExpired: PropTypes.bool.isRequired,
    tokenPresent: PropTypes.bool.isRequired,
  }).isRequired,
  fireEraseEvalAction: PropTypes.func.isRequired,
  fireChangeEvalAction: PropTypes.func.isRequired,
  fireCreateEvalAction: PropTypes.func.isRequired,
};

ApplicationDetails.propTypes = {
  index_report: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  account: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    evals: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
      .isRequired,
    loggedIn: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    tokenExpired: PropTypes.bool.isRequired,
    tokenPresent: PropTypes.bool.isRequired,
  }).isRequired,
  secure: PropTypes.shape({
    id: PropTypes.number.isRequired,
    now: PropTypes.string.isRequired,
    then: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetails);
