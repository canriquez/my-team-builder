import React from "react";
import styles from "../styles/ApplicationCard.module.css";

const ApplicationCard = ({ cardObject }) => {
  const { avatar, app_name, job_name, app_date, app_age } = cardObject;
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeading}>
        <h1>{job_name}</h1>
      </div>
      <div className={styles.sectionTitle}>
        <h2>Applicants General Information</h2>
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

export default ApplicationCard;
