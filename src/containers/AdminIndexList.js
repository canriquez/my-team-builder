import React from "react";
import { connect } from "react-redux";
import styles from "../styles/AdminIndexList.module.css";
import ApplicationCard from "../components/ApplicationCard";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import dateFormat from "dateformat";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

  const cardObject = (object) => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const application_age = timeAgo.format(
      new Date(object.aplication_date),
      "round"
    );

    return {
      job_name: object.job_name,
      avatar: object.applicant_avatar,
      app_name: object.applicant_name,
      app_age: application_age,
      app_date: dateFormat(Date(object.aplication_date)),
    };
  };

  return (
    <div className={styles.carroucelContainer}>
      <Carousel responsive={responsive}>
        {index_report.map((object, id) => {
          return (
            <ApplicationCard
              key={"child" + id}
              cardObject={cardObject(object)}
            />
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
