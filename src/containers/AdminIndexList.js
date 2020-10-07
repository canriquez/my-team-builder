import React from "react";
import { connect } from "react-redux";
import styles from "../styles/AdminIndexList.module.css";
import ApplicationCard from "../components/ApplicationCard";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import dateFormat from "dateformat";

const AdminIndexList = ({ index_report }) => {
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
      {index_report.map((object, id) => {
        return (
          <ApplicationCard key={"child" + id} cardObject={cardObject(object)} />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
  secure: state.secure,
  index_report: state.admin.index_report,
});

export default connect(mapStateToProps, null)(AdminIndexList);
