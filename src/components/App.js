import React from "react";
import styles from "../styles/App.module.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.appContainer}>
        <h1>logo</h1>
        <h2>Sign In</h2>
        <h2>Sign Up</h2>
      </div>
    );
  }
}

export default App;
