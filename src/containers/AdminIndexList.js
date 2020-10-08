import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styles from "../styles/AdminIndexList.module.css";
import ApplicationCard from "../components/ApplicationCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { cardObject } from "../helpers/componentHelp";
import {
  backendRefreshAdmin,
  filterUpdate,
  updateAccountData,
  killAuthToken,
} from "../actions/index";
import menu from "../assets/icons/menu.svg";
import MainFilter from "../components/MainFilter";
import { ReactComponent as GoBack } from "../assets/icons/pagePrev.svg";

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
    this.checkFilter = this.checkFilter.bind(this);
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

  logout() {
    console.log(
      "ATTEMPT TO LOGOUT  ||||||||||||||||||&&&7777777777777&&&&&7777"
    );
    this.logoutAction({
      id: null,
      name: null,
      evals: null,
    });
    this.killsLoginInfo();
  }

  checkFilter(object, filter) {
    console.log("CHEKING FILTERED LIST");
    console.log({ object });
    console.log(filter);
    console.log(object.current_admin_evaluation);
    console.log(object.current_admin_evaluation === filter);
    if (filter === "all") {
      return object;
    }
    if (filter === object.current_admin_evaluation) {
      return object;
    }
    return true;
  }

  componentDidMount() {
    const payload = {
      token: this.secure.token,
      id: this.account.id,
    };
    console.log("||||===>>> AT COMPONENT DID MOUNT IN ADMIN_INDEX_LIST");
    console.log({ payload });
    this.fireBackendRefreshAdmin(payload);
  }

  render() {
    const { secure, mainFilter, index_report } = this.props;
    if (!secure.id) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <div className={styles.navBar}>
          <div className={styles.menuIcon}>
            <button onClick={this.logout}>Log Out</button>
            <MainFilter changeMainFilter={this.changeMainFilter} />
            <h2>{this.account.name}</h2>
          </div>
        </div>
        <div className={styles.carroucelContainer}>
          <Carousel responsive={this.responsive}>
            {index_report.map((object, id) => {
              const toRender = this.checkFilter(object, mainFilter);
              console.log({ toRender });
              if (toRender) {
                return (
                  <React.Fragment key={"child" + id}>
                    <Link
                      className={styles.routerLink}
                      to={`/applications/${id}`}
                    >
                      <ApplicationCard cardObject={cardObject(object)} />
                    </Link>
                  </React.Fragment>
                );
              }
            })}
          </Carousel>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  account: state.account,
  secure: state.secure,
  index_report: state.admin.index_report,
  mainFilter: state.mainFilter,
});

/// YOU DONT LET THE COMPONENT UPDATES IT OWN STATE

const mapDispatchToProps = (dispatch) => ({
  fireBackendRefreshAdmin: (payload) => {
    dispatch(backendRefreshAdmin(payload));
  },
  changeMainFilter: (filter) => dispatch(filterUpdate(filter)),
  logoutAction: (payload) => {
    dispatch(updateAccountData(payload));
  },
  killsLoginInfo: () => {
    dispatch(killAuthToken());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminIndexList);
