import React from "react";
import { connect } from "react-redux";
import styles from "../styles/AdminIndexList.module.css";
import ApplicationCard from "../components/ApplicationCard";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import dateFormat from "dateformat";

const AdminIndexList = ({ index_report }) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const application_age = timeAgo.format(
    new Date(index_report[0].aplication_date),
    "round"
  );

  const cardObject = {
    job_name: index_report[0].job_name,
    avatar: index_report[0].applicant_avatar,
    app_name: index_report[0].applicant_name,
    app_age: application_age,
    app_date: dateFormat(Date(index_report[0].aplication_date)),
  };

  return (
    <div className={styles.carroucelContainer}>
      <ApplicationCard cardObject={cardObject} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
  secure: state.secure,
  index_report: state.admin.index_report,
});

export default connect(mapStateToProps, null)(AdminIndexList);
