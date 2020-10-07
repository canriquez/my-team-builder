import React from "react";
import styles from "../styles/ApplicationDetails.module.css";
import { cardObject } from "../helpers/componentHelp";

const ApplicationDetails = ({ match, secure, index_report }) => {
  const {
    app_id,
    app_name,
    app_age,
    app_date,
    likes,
    dislikes,
    job_id,
    job_name,
    job_date,
    job_age,
    job_author,
    avatar,
  } = cardObject(index_report[match.params.id]);

  console.log("AT APPLICATION DETAILS");
  console.log({ avatar });
  console.log({ match });
  console.log({ cardObject });
  console.log({ index_report });
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeading}>
        <h1>{job_name}</h1>
        <h4>
          Job posted by: {job_author}, {job_age}
        </h4>
        <h4>Published on: {job_date}</h4>
      </div>
      <div className={styles.sectionTitle}>
        <h2>Applicant General Information</h2>
      </div>
      <div className={styles.applicantAvatar}>
        <img src={avatar} alt="user avatar" />
        <h2>{app_name}</h2>
        <h4>applied {app_age}</h4>
      </div>
      <div className={styles.applicantInfoWrap}>
        <div className={styles.applicantData}>
          <h3>Application Date</h3>
          <h4>{app_date}</h4>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
