/*  eslint-disable  camelcase */
import React from 'react';
import { PropTypes } from 'prop-types';
import styles from '../styles/ApplicationCard.module.css';
import approved from '../assets/icons/approved.svg';
import declined from '../assets/icons/declined.svg';

const ApplicationCard = ({ cardObject }) => {
  const {
    avatar,
    app_name,
    job_name,
    app_date,
    app_age,
    admin_eval,
  } = cardObject;
  return (
    <article className={styles.cardContainer}>
      <div className={styles.cardHeading}>
        <h1>{job_name}</h1>
        {admin_eval === 0 ? (
          <div className={styles.evalIcon}>
            <img className={styles.approvedIcon} src={declined} alt="Logo" />
          </div>
        ) : (
          ''
        )}
        {admin_eval === 1 ? (
          <div className={styles.evalIcon}>
            <img className={styles.approvedIcon} src={approved} alt="Logo" />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={styles.sectionTitle}>
        <h2>Applicant General Information</h2>
      </div>
      <div className={styles.applicantAvatar}>
        <img src={avatar} alt="user avatar" />
        <h2>{app_name}</h2>
        <h4>
          applied
          {app_age}
        </h4>
      </div>
      <div className={styles.applicantInfoWrap}>
        <div className={styles.applicantData}>
          <h3>Application Date</h3>
          <h4>{app_date}</h4>
        </div>
      </div>
    </article>
  );
};

ApplicationCard.propTypes = {
  cardObject: PropTypes.shape({
    application_id: PropTypes.number.isRequired,
    app_id: PropTypes.number.isRequired,
    app_name: PropTypes.string.isRequired,
    app_age: PropTypes.string.isRequired,
    app_date: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    job_id: PropTypes.number.isRequired,
    job_name: PropTypes.string.isRequired,
    job_date: PropTypes.string.isRequired,
    job_age: PropTypes.string.isRequired,
    job_author: PropTypes.string.isRequired,
    admin_eval: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default ApplicationCard;
