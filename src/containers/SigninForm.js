import React from "react";
import { connect } from "react-redux";
import { backendSigninAction, checkApiEmail } from "../actions/index";
import {
  validEmail,
  validPassword,
  enableSubmit,
  disableSubmit,
} from "../helpers/componentHelp";
import styles from "../styles/SigninForm.module.css";
import { BrowserRouter as Router, Redirect } from "react-router-dom";

class SigninForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      valid_email: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.mapDispatchToProps = this.mapDispatchToProps.bind(this);
  }

  handleChange() {
    const { checkBackendEmail, new_email } = this.props;
    const formEmail = document.getElementById("emailValue").value;
    const formPassword = document.getElementById("passwordValue").value;
    const valid_email = validEmail(formEmail);

    this.setState({
      email: formEmail,
      valid_email: valid_email,
      password: formPassword,
    });

    /*     if (valid_email && formEmail !== new_email && formEmail !== "") {
      console.log("cheking email @API");
      checkBackendEmail({ email: formEmail });
    } */
    if (formEmail.length > 5 && valid_email) {
      enableSubmit("submit-btn");
    } else {
      disableSubmit("submit-btn");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fireBackendSignin } = this.props;
    console.log("click submit()");

    const signInData = {
      ...this.state,
    };
    this.setState({
      email: "jwt4@jwt.com",
      valid_email: false,
      password: "12345",
    });

    fireBackendSignin(signInData);

    //If signin successfull. We store the token and we send back to homepage for later go to index page
  }

  render() {
    const { email, valid_email, password } = this.state;
    const { new_email, secure } = this.props;
    console.log(this.props);
    console.log("new API email is :" + new_email);
    return (
      <div className={styles.formblock}>
        <div className={styles.formwrap}>
          <div className={styles.formtitle}>
            <h1>Sign in</h1>
            <h3>Hi there, signin to your account</h3>
          </div>
          <form
            className={styles.formfields}
            action="#"
            onSubmit={this.handleSubmit}
          >
            <label htmlFor="emailValue">Your email</label>
            <div className={styles.emailInputWrap}>
              <input
                className="emailValue"
                type="text"
                onChange={this.handleChange}
                value={email}
                id="emailValue"
                autoComplete="username"
              />
            </div>

            <label htmlFor="passwordValue">
              password
              {!validPassword(password) ? " (5 or more characters)" : ""}
            </label>
            <div className={styles.passInputWrap}>
              <input
                className="passwordValue"
                type="password"
                onChange={this.handleChange}
                value={password}
                id="passwordValue"
                autoComplete="new-password"
              />
            </div>
            <button
              id="submit-btn"
              className="Rectangle-2 submit-btn base-button submit-disabled"
              type="submit"
            >
              Sign In
            </button>
            {secure.id ? <Redirect to="/" /> : ""}
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fireBackendSignin: (accountData) => {
    dispatch(backendSigninAction(accountData));
  },
  checkBackendEmail: (email) => {
    dispatch(checkApiEmail(email));
  },
});

const mapStateToProps = (state) => ({
  account: state.account,
  secure: state.secure,
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
