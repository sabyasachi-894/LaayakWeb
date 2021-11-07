import React, { Component } from "react";
import firebase from "../firebase";
import { Link, Redirect } from "react-router-dom";
import M from "materialize-css";
import ShowPassword from "../ShowPassword";

const auth = firebase.auth();

class NewTeacher extends Component {
  state = {
    email: "",
    password: "",
    authStatus: false,
    completedSignUp: false,
  };

  componentDidMount() {}

  handleSignUp = (e) => {
    e.preventDefault();
    const classList = e.target.classList;
    classList.add("loading");
    const { email, password } = this.state;
    if (!this.state.authStatus) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.user.updateProfile({
            displayName: "teacher",
          });
          classList.remove("loading");
          M.toast({
            html: "Registered Successfully",
            classes: "toast success-toast",
          });
          this.setState({ authStatus: true });
        })
        .catch((err) => {
          classList.remove("loading");
          M.toast({ html: err.message, classes: "toast error-toast" });
        });
    }
  };

  handleChange = (e) => {
    const nam = e.target.name,
      val = e.target.value;
    this.setState({
      [nam]: val,
    });
  };

  render() {
    if (this.state.completedSignUp) return <Redirect to="/teacher" />;
    return this.state.authStatus ? (
      <Redirect to="/newteacher/details" />
    ) : (
      <div>{this.getForm()}</div>
    );
  }

  getForm = () => {
    return (
      <div className="main-container">
        <div className="container-login mx-auto">
          <div className="con-login">
            <h1>Sign Up</h1>
            <form onSubmit={this.handleSignUp} style={{ width: "100%" }}>
              <div className="con-inputs mt-4">
                <div className="con-input">
                  <label htmlFor="email">Email</label>
                  <input
                    placeholder="email@example.com"
                    id="email"
                    name="email"
                    value={this.state.email}
                    type="text"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="con-input">
                  <label htmlFor="password">Password</label>
                  <input
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={this.state.password}
                    type="password"
                    onChange={this.handleChange}
                    required
                  />
                  <ShowPassword />
                </div>
                <div className="con-new">
                  Already registered? <Link to="/teacher">Log In</Link>
                </div>
              </div>
              <footer>
                <button type="submit" className="btn-login">
                  Register
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    );
  };
}

export default NewTeacher;
