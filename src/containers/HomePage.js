import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../styles/HomePage.module.css';
import Button from '../components/HomeButton';
import logo from '../assets/icons/logo.svg';
import AdminIndexList from './AdminIndexList';
import UserIndexList from '../components/UserIndexList'

const HomePage = ({ secure, admin, account }) => (
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

const mapStateToProps = state => ({
  account: state.account,
  secure: state.secure,
  admin: state.admin,
});

HomePage.propTypes = {
  index_report: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  admin: PropTypes.shape({
    index_report: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
      .isRequired,
  }).isRequired,
  secure: PropTypes.shape({
    id: PropTypes.number.isRequired,
    now: PropTypes.string.isRequired,
    then: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(HomePage);
