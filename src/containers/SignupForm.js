import React from "react";
import { connect } from "react-redux";
import { backendSignupAction } from "../actions/index";
import { validEmail } from "../helpers/componentHelp";

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
    const formName = document.getElementById("nameValue").value;
    const formEmail = document.getElementById("emailValue").value;
    const formPassword = document.getElementById("passwordValue").value;
    const formPasswordRepeat = document.getElementById("passwordRepeatValue")
      .value;
    const select = document.getElementById("role").value;
    const valid_email = validEmail(formEmail);
    const valid_password = formPassword === formPasswordRepeat;

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
    if (formEmail.length > 5 && valid_email && valid_password) {
      document.getElementById("submit-btn").disabled = false;
    } else {
      document.getElementById("submit-btn").disabled = true;
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
    /*     
    const { onSubmitCreateBook } = this.props;
    const { title, role } = this.state;
    if (title === "" || role === "role") {
      return;
    }

    const book = {
      ...this.state,
      id: randomId(),
    };
    onSubmitCreateBook(book); */
  }

  render() {
    const { name, email, password, password_repeat } = this.state;
    return (
      <div className="form-block">
        <div className="form-title">
          <h1>Sign up</h1>
          <h3>Hi there, create a new account with us</h3>
        </div>
        <form action="#" onSubmit={this.handleSubmit}>
          <label htmlFor="nameValue">Name</label>
          <input
            className="nameValue"
            type="text"
            onChange={this.handleChange}
            value={name}
            id="nameValue"
            placeholder="Name"
          />
          <label htmlFor="emailValue">email</label>
          <p className="error-field hide" id="email-error">
            {" "}
            ... a valid email please
          </p>
          <input
            className="emailValue"
            type="text"
            onChange={this.handleChange}
            value={email}
            id="emailValue"
            autoComplete="username"
            placeholder="email address"
          />
          <label htmlFor="role">Your role</label>
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
          <label htmlFor="passwordValue">password</label>
          <input
            className="passwordValue"
            type="password"
            onChange={this.handleChange}
            value={password}
            id="passwordValue"
            autoComplete="new-password"
          />
          <label htmlFor="passwordRepeatValue">repeat password</label>
          <p className="error-field hide" id="pass-error">
            passwords don't match
          </p>
          <input
            className="passwordRepeatValue"
            type="password"
            onChange={this.handleChange}
            value={password_repeat}
            id="passwordRepeatValue"
            autoComplete="new-password"
          />
          <button
            id="submit-btn"
            className="Rectangle-2 submit-btn base-button"
            type="submit"
          >
            <p>Sign Up</p>
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fireBackendSignup: (newAccountData) => {
    dispatch(backendSignupAction(newAccountData));
  },
});

export default connect(null, mapDispatchToProps)(SignupForm);
