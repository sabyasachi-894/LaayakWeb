import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import firebase from "../firebase";
import ShowPassword from "../ShowPassword"

class StuLogin extends Component {
    db = firebase.firestore();
    isMount = false;
    state = {
        email: "",
        password: ""
    }

    componentDidMount() {
        this.isMount = true;
    }

    UNSAFE_componentWillMount() {
        this.isMount = false;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const classList = e.target.classList;
        classList.add("loading");
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                if (user.user.displayName === "student") {
                    classList.remove("loading");
                    M.toast({ html: "Logged In Successfully", classes: "toast success-toast" })
                    window.location.pathname = "/student"
                } else {
                    classList.remove("loading");
                    M.toast({ html: "Invalid Email/Password", classes: "toast error-toast" })
                }
            })
            .catch((err) => {
                if 
                (
                    err.message === "The password is invalid or the user does not have a password." ||
                    err.message === "There is no user record corresponding to this identifier. The user may have been deleted."
                ) {
                    classList.remove("loading");
                    M.toast({ html: "Invalid Email/Password", classes: "toast error-toast" })
                } else{
                    classList.remove("loading");
                    M.toast({ html: err.message, classes: "toast error-toast" })
                }
            });
    };

    handleChange = (e) => {
        const name = e.target.name,
            value = e.target.value;
        if (this.isMount) {
            this.setState({
                [name]: value
            })
        }
    }

    render() {
        return (
            <div className="main-container">
                <div className="container-login mx-auto">
                    <div className="con-login">
                        <h1>Login</h1>
                        <form style={{ width: "100%" }}>
                            <div className="con-inputs mt-4">
                                <div className="con-input">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        placeholder="Email"
                                        id="email"
                                        type="email"
                                        value={this.state.email}
                                        name="email"
                                        required
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="con-input">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        placeholder="Password"
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <ShowPassword />
                                </div>
                                <div className="con-new">
                                    New here? <Link to="/student/signup">Sign Up</Link>
                                </div>
                                <footer>
                                    <button onClick={this.handleSubmit} type="submit" className="btn-login">
                                        Log In
                                </button>
                                </footer>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default StuLogin;