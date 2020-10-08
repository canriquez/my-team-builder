import React from 'react';
import { PropTypes } from 'prop-types';
import styles from '../styles/HomeButton.module.css';

const HomeButton = ({ name }) => (
  <button id="submit-btn" className={styles.homeButton} type="button">
    {name}
  </button>
);

HomeButton.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HomeButton;
