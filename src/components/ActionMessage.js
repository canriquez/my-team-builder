import React, { useEffect } from 'react';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styles from '../styles/ActionMessage.module.css';

import success from '../assets/icons/success.svg';
import error from '../assets/icons/error.svg';
import { updateSignupState } from '../actions/index';

const ActionMessage = ({ match, validCall, cleanSignupState }) => {
  useEffect(() => {
    cleanSignupState();
  });

  if (!validCall) {
    return <Redirect to="/" />;
  }

  const mindex = parseInt(match.params.id, 10);
  const messages = [
    {
      message: 'Congratulations, account created',
      button: 'to Sign in.',
    },
    {
      message: 'There was an error, please try again later...',
      button: 'to Home',
    },
    {
      message:
        'There was an connectivity error with our signup services, please try again later...',
      button: 'to Home',
    },
  ];

  return (
    <section className={styles.formblock}>
      <article className={styles.formwrap}>
        <div className={styles.formtitle}>
          <h1>{messages[mindex].message}</h1>
        </div>

        {mindex === 0 ? (
          <div className={styles.boxIcon}>
            <img className={styles.successIcon} src={success} alt="success" />
          </div>
        ) : (
          ''
        )}
        {mindex === 1 || mindex === 2 ? (
          <div className={styles.boxIcon}>
            <img className={styles.errorIcon} src={error} alt="error" />
          </div>
        ) : (
          ''
        )}

        {mindex === 0 ? (
          <Link className={styles.routerLink} to="/signin">
            <button
              id="submit-btn"
              className={styles.actionButton}
              type="button"
            >
              {messages[mindex].button}
            </button>
          </Link>
        ) : (
          ''
        )}

        {mindex === 1 || mindex === 2 ? (
          <Link className={styles.routerLink} to="/">
            <button
              id="submit-btn"
              className={styles.actionButton}
              type="button"
            >
              {messages[mindex].button}
            </button>
          </Link>
        ) : (
          ''
        )}
      </article>
    </section>
  );
};

const mapStateToProps = state => ({
  signup: state.signup,
});

const mapDispatchToProps = dispatch => ({
  cleanSignupState: () => {
    dispatch(updateSignupState({ newSignup: '', action: '' }));
  },
});

ActionMessage.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  validCall: PropTypes.bool.isRequired,
  cleanSignupState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionMessage);
