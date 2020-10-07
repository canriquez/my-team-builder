import React from "react";
import { connect } from "react-redux";
import styles from "../styles/AdminIndexList.module.css";
import ApplicationCard from "../components/ApplicationCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { cardObject } from "../helpers/componentHelp";

const AdminIndexList = ({ index_report }) => {
  const responsive = {
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

  return (
    <div className={styles.carroucelContainer}>
      <Carousel responsive={responsive}>
        {index_report.map((object, id) => {
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
};

const mapStateToProps = (state) => ({
  account: state.account,
  secure: state.secure,
  index_report: state.admin.index_report,
});

export default connect(mapStateToProps, null)(AdminIndexList);
