import React from "react";
import SignupForm from "../containers/SignupForm";
import styles from "../styles/App.module.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.appContainer}>
        <div>logo</div>
        <SignupForm />
      </div>
    );
  }
}

export default App;
