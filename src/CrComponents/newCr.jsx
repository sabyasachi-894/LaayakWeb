import React, { Component } from "react";
import firebase from "../firebase";
import { Link, Redirect } from "react-router-dom";
import M from "materialize-css";
import ShowPassword from "../ShowPassword";

const auth = firebase.auth(),
  db = firebase.firestore();

class NewCr extends Component {
  isMount = false;

  state = {
    email: "",
    password: "",
    authStatus: false,
    completedSignUp: false,
  };

  componentDidMount() {
    this.isMount = true;
    if (this.isMount) {
      auth.onAuthStateChanged((user) => {
        if (user?.displayName==="cr") {          
          const stuRef = db.collection("cr").doc(user.email);
          stuRef.onSnapshot((snap) => {
            if (snap.data()) {
              this.setState({
                completedSignUp: true,
              });
            }
          });
        }
      });
    }
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  handleSignUp = (e) => {
    e.preventDefault();
    const classList = e.target.classList;
    classList.add("loading");
    const { email, password } = this.state;
    if (!this.state.authStatus) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          if(user){
            user.user.updateProfile({
              displayName: "cr"
            })
          }          
          classList.remove("loading");
          M.toast({ html: "Registered Successfully", classes: "toast success-toast" })
          this.isMount && this.setState({ authStatus: true });
        })
        .catch((err) => {
          classList.remove("loading");
          M.toast({ html: err.message, classes: "toast error-toast" })
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
    if (this.state.completedSignUp) return <Redirect to="/cr" />;

    return this.state.authStatus ? (
      <Redirect to="/newcr/details" />
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
            <form style={{ width: "100%" }}>
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
                  Already registered? <Link to="/cr">Log In</Link>
                </div>
              </div>
              <footer>
                <button onClick={this.handleSignUp} type="submit" className="btn-login">
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

export default NewCr;
