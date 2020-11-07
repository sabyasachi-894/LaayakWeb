import React, { Component } from "react";
import MainPage from "./MainPage";
import firebase from "../firebase";
import Loader from "../Loader/Loader";
import { Redirect } from "react-router-dom";
import Forbidden from "../forbidden/Forbidden";

class Landing extends Component {
    isMount = false
    state = {
        user: null,
        verified: false,
        loading: true
    };

    authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if(user.displayName === "teacher"){
                    if(this.isMount){
                        this.setState({
                            verified: true
                        })
                    }
                }
            }
            if (this.isMount) {
                this.setState({ user });
            }
        });
    };

    componentDidMount() {
        this.isMount = true
        this.authListener();
    }
    UNSAFE_componentWillMount() {
        this.isMount = false
    }

    render() {
        let display;
        (this.state.loading) && (display = <Loader />)
        if (!this.state.loading) {
            if (this.state.user) {
                if (this.state.verified) {
                    display = <MainPage />
                } else {
                    display = <Forbidden />
                }
            } else {
                return <Redirect to="/teacher/login" />
            }
        }
        setTimeout(() => {
            if (this.isMount) {
                this.setState({ loading: false })
            }
        }, 2000)
        return display;
    }
}
export default Landing;
