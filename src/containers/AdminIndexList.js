import React from "react";
import { connect } from "react-redux";
import styles from "../styles/AdminIndexList.module.css";
import ApplicationCard from "../components/ApplicationCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { cardObject } from "../helpers/componentHelp";
import { backendRefreshAdmin } from "../actions/index";

class AdminIndexList extends React.Component {
  constructor(props) {
    super(props);

    const { index_report, secure, account, fireBackendRefreshAdmin } = props;

    this.index_report = index_report;
    this.secure = secure;
    this.account = account;
    this.fireBackendRefreshAdmin = fireBackendRefreshAdmin;

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
    console.log("||||===>>> AT COMPONENT DID MOUNT IN ADMIN_INDEX_LIST");
    console.log({ payload });
    this.fireBackendRefreshAdmin(payload);
  }
  /*   React.useEffect(() => {
    const payload = {
      auth: secure.token,
      token: secure.token,
      id: account.id,
    };
    fireBackendRefreshAdmin(payload);
  });
 */
  render() {
    return (
      <div className={styles.carroucelContainer}>
        <Carousel responsive={this.responsive}>
          {this.index_report.map((object, id) => {
            return (
              <React.Fragment key={"child" + id}>
                <Link className={styles.routerLink} to={`/applications/${id}`}>
                  <ApplicationCard cardObject={cardObject(object)} />
                </Link>
              </React.Fragment>
            );
          })}
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  account: state.account,
  secure: state.secure,
  index_report: state.admin.index_report,
});

const mapDispatchToProps = (dispatch) => ({
  fireBackendRefreshAdmin: (payload) => {
    dispatch(backendRefreshAdmin(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminIndexList);
