/*  eslint-disable  camelcase, react/button-has-type, react/no-array-index-key */
import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import styles from '../styles/AdminIndexList.module.css';
import ApplicationCard from '../components/ApplicationCard';
import 'react-multi-carousel/lib/styles.css';

import {
  cardObject,
  filterIndex_list,
  humanFilter,
  clearLocalSession,
} from '../helpers/componentHelp';
import {
  backendRefreshAdmin,
  filterUpdate,
  updateAccountData,
  killAuthToken,
} from '../actions/index';
import MainFilter from '../components/MainFilter';

class AdminIndexList extends React.Component {
  constructor(props) {
    super(props);

    const {
      index_report,
      secure,
      account,
      fireBackendRefreshAdmin,
      mainFilter,
      changeMainFilter,
      logoutAction,
      killsLoginInfo,
    } = props;

    this.index_report = index_report;
    this.secure = secure;
    this.account = account;
    this.fireBackendRefreshAdmin = fireBackendRefreshAdmin;
    this.changeMainFilter = changeMainFilter;
    this.mainFilter = mainFilter;
    // this.checkFilter = this.checkFilter.bind(this);
    this.logout = this.logout.bind(this);
    this.logoutAction = logoutAction;
    this.killsLoginInfo = killsLoginInfo;

    this.responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
  }

  componentDidMount() {
    const payload = {
      token: this.secure.token,
      id: this.account.id,
    };
    if (this.secure.token && this.account.id && this.account.role === 'admin') {
      this.fireBackendRefreshAdmin(payload);
    }
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
    const {
      secure, mainFilter, index_report, filteredReport, account,
    } = this.props;
    const totRecords = index_report.length;
    // eslint-disable-next-line
    const filRecords = filteredReport.length;
    if (!secure.id || account.role === 'user' || index_report.length === 0) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <header className={styles.navBar}>
          <nav className={styles.menuIcon}>
            <button className={styles.signoutButton} onClick={this.logout}>
              Log Out
            </button>
            <MainFilter
              changeMainFilter={this.changeMainFilter}
              mainFilter={mainFilter}
            />
            <div className={styles.userWrap}>
              <h2>{account.name}</h2>
              <h4 className={styles.role}>{account.role}</h4>
            </div>
          </nav>
        </header>
        <section className={styles.carroucelContainer}>
          <article className={styles.filterInfo}>
            <h3>
              Currently showing
              <span className={`${styles.humanFilter} txt-${mainFilter}`}>
                {humanFilter(mainFilter)}
                {' '}
              </span>
              records.
            </h3>
            <h4>
              Showing
              {' '}
              <span> </span>
              <span className={`${styles.humanFilter} txt-${mainFilter}`}>
                {filRecords}
              </span>
              {' '}
              out of
              <span> </span>
              {' '}
              <span className={`${styles.humanFilter} txt-${mainFilter}`}>
                {totRecords}
                {' '}
              </span>
              total records
            </h4>
          </article>
          <Carousel responsive={this.responsive}>
            {filteredReport.map((object, id) => (
              <React.Fragment key={`child${id}`}>
                <Link
                  className={styles.routerLink}
                  to={`/applications/${object.application_id}`}
                >
                  <ApplicationCard cardObject={cardObject(object)} />
                </Link>
              </React.Fragment>
            ))}
          </Carousel>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account,
  secure: state.secure,
  index_report: state.admin.index_report,
  filteredReport: filterIndex_list(state.admin.index_report, state.mainFilter),
  mainFilter: state.mainFilter,
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

AdminIndexList.propTypes = {
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
  filteredReport: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminIndexList);
