import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../firebase";
import Forbidden from "../forbidden/Forbidden";
import Loader from "../Loader/Loader";
import MainPage from "./mainPage";

const db = firebase.firestore();

class CrLanding extends Component {
  isMount = false;

  state = {
    user: null,
    doc: "",
    verified: false,
    loading: true,
  };

  authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName === "cr") {
          if (this.isMount) {
            this.setState({
              verified: true,
            });
          }
        }
        const docRef = db.collection("cr").doc(user?.email);
        docRef.get().then((doc) => {
          if (doc.exists) {
            if (this.isMount) {
              this.setState({
                doc: doc.data().classId,
              });
            }
          }
        });
      }
      if (this.isMount) {
        this.setState({ user });
      }
    });
  };

  componentDidMount() {
    this.isMount = true;
    this.authListener();
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  render() {
    let display;
    this.state.loading && (display = <Loader />);
    if (!this.state.loading) {
      if (this.state.user) {
        this.state.verified
          ? (display = <MainPage CrCode={this.state.doc} />)
          : (display = <Forbidden />);
      } else {
        return <Redirect to="/cr/login" />;
      }
    }
    setTimeout(() => {
      if (this.isMount) {
        this.setState({ loading: false });
      }
    }, 2000);
    return display;
  }
}
export default CrLanding;
