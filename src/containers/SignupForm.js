import React from "react";

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
    this.setState({
      name: formName,
      role: this.roles[select],
      email: formEmail,
      avatar: "http://fronEndRole.com",
      password: formPassword,
      password_repeat: formPasswordRepeat,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("click submit()");
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

export default SignupForm;
