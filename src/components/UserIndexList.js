/*  eslint-disable  camelcase, react/button-has-type, react/no-array-index-key */
import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import styles from '../styles/AdminIndexList.module.css';
import 'react-multi-carousel/lib/styles.css';

import {
  filterIndex_list,
  clearLocalSession,
} from '../helpers/componentHelp';
import {
  backendRefreshAdmin,
  filterUpdate,
  updateAccountData,
  killAuthToken,
} from '../actions/index';


class UserIndexList extends React.Component {
  constructor(props) {
    super(props);

    const {
      secure,
      account,
      logoutAction,
      killsLoginInfo,
    } = props;

    this.secure = secure;
    this.account = account;

    // this.checkFilter = this.checkFilter.bind(this);
    this.logout = this.logout.bind(this);
    this.logoutAction = logoutAction;
    this.killsLoginInfo = killsLoginInfo;

  }


  logout() {
    this.logoutAction({
      id: null,
      name: null,
      evals: null,
    });
    this.killsLoginInfo();
    clearLocalSession();
  }

  render() {
    const {secure, account} = this.props;
    if (!secure.id ) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <div className={styles.navBar}>
          <div className={styles.menuIcon}>
            <button className={styles.signoutButton} onClick={this.logout}>
              Log Out
            </button>
            <div className={styles.userWrap}>
              <h2>{account.name}</h2>
              <h4 className={styles.role}>{this.account.role}</h4>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account,
  secure: state.secure,
});

/// YOU DONT LET THE COMPONENT UPDATES IT OWN STATE

const mapDispatchToProps = dispatch => ({
  fireBackendRefreshAdmin: payload => {
    dispatch(backendRefreshAdmin(payload));
  },
  changeMainFilter: filter => dispatch(filterUpdate(filter)),
  logoutAction: payload => {
    dispatch(updateAccountData(payload));
  },
  killsLoginInfo: () => {
    dispatch(killAuthToken());
  },
});

UserIndexList.propTypes = {
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
  mainFilter: PropTypes.string.isRequired,
  changeMainFilter: PropTypes.func.isRequired,
  fireBackendRefreshAdmin: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired,
  killsLoginInfo: PropTypes.func.isRequired,
  filteredReport: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserIndexList);
