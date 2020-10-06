import React from "react";
import { connect } from "react-redux";
import { backendSignupAction, checkApiEmail } from "../actions/index";
import {
  validEmail,
  validName,
  validPassword,
  enableSubmit,
  disableSubmit,
} from "../helpers/componentHelp";
import styles from "../styles/SignupForm.module.css";
import okIcon from "../assets/icons/ok.svg";
import warningIcon from "../assets/icons/warning.svg";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      role: "",
      avatar: "",
      password: "",
      password_repeat: "",
      valid_email: false,
      password_match: false,
    };

    this.roles = ["admin", "user"];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.mapDispatchToProps = this.mapDispatchToProps.bind(this);
  }

  handleChange() {
    const { checkBackendEmail, new_email } = this.props;
    const formName = document.getElementById("nameValue").value;
    const formEmail = document.getElementById("emailValue").value;
    const formPassword = document.getElementById("passwordValue").value;
    const formPasswordRepeat = document.getElementById("passwordRepeatValue")
      .value;
    const select = document.getElementById("role").value;
    const valid_email = validEmail(formEmail);
    const valid_password =
      formPassword === formPasswordRepeat && formPassword !== "";

    this.setState({
      name: formName,
      role: this.roles[select],
      email: formEmail,
      avatar: "http://fronEndRole.com",
      password: formPassword,
      password_repeat: formPasswordRepeat,
      valid_email: valid_email,
      password_match: valid_password,
    });

    if (valid_email && formEmail !== new_email && formEmail !== "") {
      console.log("cheking email @API");
      checkBackendEmail({ email: formEmail });
    }
    if (
      formEmail.length > 5 &&
      valid_email &&
      valid_password &&
      formEmail == new_email
    ) {
      enableSubmit("submit-btn");
    } else {
      disableSubmit("submit-btn");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fireBackendSignup } = this.props;
    console.log("click submit()");

    const signupData = {
      ...this.state,
    };

    fireBackendSignup(signupData);
  }

  render() {
    const {
      name,
      email,
      password,
      password_repeat,
      password_match,
    } = this.state;
    const { new_email } = this.props;
    console.log(this.props);
    console.log("new API email is :" + new_email);
    return (
      <div className={styles.formblock}>
        <div className={styles.formwrap}>
          <div className={styles.formtitle}>
            <h1>Sign up</h1>
            <h3>Hi there, create a new account with us</h3>
          </div>
          <form
            className={styles.formfields}
            action="#"
            onSubmit={this.handleSubmit}
          >
            <label htmlFor="namelValue">
              Your name
              {!validName(name) ? " (5 or more characters)" : ""}
            </label>
            <div className={styles.nameInputWrap}>
              <input
                className="nameValue"
                type="text"
                onChange={this.handleChange}
                value={name}
                id="nameValue"
              />
              <img
                className={
                  styles.formIcons + (validName(name) ? " show" : " hide")
                }
                src={okIcon}
                alt="Logo"
                id="ok-icon"
              />
            </div>
            <label htmlFor="emailValue">email</label>
            <div className={styles.emailInputWrap}>
              <input
                className="emailValue"
                type="text"
                onChange={this.handleChange}
                value={email}
                id="emailValue"
                autoComplete="username"
              />
              <img
                className={
                  styles.formIcons +
                  (new_email === email && email !== "" ? " show" : " hide")
                }
                src={okIcon}
                alt="Logo"
                id="ok-icon"
              />
              <img
                className={
                  styles.waringIcon +
                  (new_email === "taken" ? " show" : " hide")
                }
                src={warningIcon}
                alt="Logo"
                id="warning-icon"
              />
            </div>
            <label htmlFor="role">Your role (*only for demo)</label>
            <select
              className="role"
              name="role"
              id="role"
              onChange={this.handleChange}
            >
              {this.roles.map((cat, id) => (
                <option key={`opt_${id * 2}`} value={id}>
                  {cat}
                </option>
              ))}
            </select>

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
              <img
                className={
                  styles.formIcons +
                  (validPassword(password) ? " show" : " hide")
                }
                src={okIcon}
                alt="Logo"
                id="ok-icon"
              />
            </div>

            <label htmlFor="passwordRepeatValue">repeat password</label>
            <div className={styles.passRepeatInputWrap}>
              <input
                className="passwordRepeatValue"
                type="password"
                onChange={this.handleChange}
                value={password_repeat}
                id="passwordRepeatValue"
                autoComplete="new-password"
              />
              <img
                className={
                  styles.formIcons + (password_match ? " show" : " hide")
                }
                src={okIcon}
                alt="Logo"
                id="ok-icon"
              />
            </div>
            <button
              id="submit-btn"
              className="Rectangle-2 submit-btn base-button submit-disabled"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fireBackendSignup: (newAccountData) => {
    dispatch(backendSignupAction(newAccountData));
  },
  checkBackendEmail: (email) => {
    dispatch(checkApiEmail(email));
  },
});

const mapStateToProps = (state) => ({
  new_email: state.signup.email_available,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
