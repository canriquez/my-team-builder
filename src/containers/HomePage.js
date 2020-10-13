import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../styles/HomePage.module.css';
import Button from '../components/HomeButton';
import logo from '../assets/icons/logo.svg';
import AdminIndexList from './AdminIndexList';
import UserIndexList from '../components/UserIndexList';
import { updateSignupState } from '../actions/index';

const HomePage = ({
  secure, admin, account, cleanSignupState,
}) => {
  cleanSignupState();
  return (

    <div className={styles.pageContainer}>
      <nav className={styles.buttonWrap}>
        {!secure.id ? (
          <>
            <Link className={styles.routerLink} to="/signin">
              <Button name="Sign in" />
            </Link>
            <Link className={styles.routerLink} to="/signup">
              <Button name="Sign up" />
            </Link>
          </>
        ) : (
          'USER LOGGED IN'
        )}
        {admin.index_report ? <AdminIndexList /> : ''}
        {account.role === 'user' ? <UserIndexList /> : ''}
      </nav>
      <article className={styles.brandWrapper}>
        <div className={styles.logoWrap}>
          <img src={logo} alt="Logo" id="ok-icon" />
        </div>
        <h1 className={styles.brand}>My Team Builder</h1>
      </article>
    </div>
  );
};

const mapStateToProps = state => ({
  account: state.account,
  secure: state.secure,
  admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
  cleanSignupState: () => {
    dispatch(updateSignupState({ newSignup: '', action: '', signInVal: null }));
  },
});

HomePage.propTypes = {
  admin: PropTypes.shape({
    index_report: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
      .isRequired,
  }).isRequired,
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
  cleanSignupState: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
