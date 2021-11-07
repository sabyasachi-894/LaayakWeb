import React, { Component } from "react";
import firebase from "../firebase";
import { Redirect } from "react-router-dom";
const db = firebase.firestore(),
  auth = firebase.auth();

let docRef = db.collection("classes").doc();

class AfterSignup extends Component {
  isMount = false;
  state = {
    details: {
      branch: "",
      college: "",
      course: "",
      crName: "", //username
      sem: "",
    },
    rollNo: "",
    redirect: false,
  };

  componentDidMount() {
    this.isMount = true;
    if (this.isMount) {
      auth.onAuthStateChanged((user) => {
        if (this.isMount) {
          if (user) {
            this.setState({
              user,
              forgery: false,
            });
            // this.addDoc();
          } else {
            this.setState({ forgery: true });
          }
        }
      });
    }
  }

  UNSAFE_componentWillMount() {
    this.isMount = false;
  }

  handleChange = (e) => {
    const nam = e.target.name,
      val = e.target.value,
      details = { ...this.state.details };
    details[nam] = val;
    this.setState({
      details,
    });
  };

  addDoc = () => {
    if (this.state.user?.displayName === "cr") {
      const crRef = db.collection("cr").doc(this.state.user.email);
      crRef.onSnapshot((snap) => {
        if (snap.data()) {
          const claRef = db.collection("classes").doc(snap.data().classId);

          claRef.get().then((doc) => {
            if (doc.exists) {
              if (this.isMount) this.setState({ redirect: true });
            } else {
              // if (this.isMount)
              // crRef.set({
              //   classId: docRef.id,
              //   email: this.state.user.email,
              //   rollNo: this.state.rollNo,
              //   name: this.state.details.crName,
              // });
            }
          });
        } else {
          // crRef.set({
          //   classId: docRef.id,
          // });
        }
      });
    }
  };

  render() {
    if (this.state.forgery) return <Redirect to="/newcr" />;
    if (this.state.redirect) {
      return <Redirect to="/cr" />;
    } else {
      return <div>{this.getDetails()}</div>;
    }
  }

  handleSubmitDetails = (e) => {
    e.preventDefault();
    const classList = e.target.classList;
    classList.add("loading");
    if (this.state.user?.displayName === "cr") {
      this.initAll(classList);
    }
  };

  getDetails = () => {
    return (
      <div className="main-container">
        <div className="container-login mx-auto">
          <div className="con-login">
            <h1>Additional Details</h1>
            <form onSubmit={this.handleSubmitDetails} style={{ width: "100%" }}>
              <div className="con-inputs mt-4">
                <div className="con-input">
                  <label htmlFor="crName">Username</label>
                  <input
                    placeholder="Username"
                    id="crName"
                    name="crName"
                    value={this.state.details["crName"]}
                    type="text"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="con-input">
                  <label htmlFor="rollno">Roll Number</label>
                  <input
                    placeholder="Roll Number"
                    id="rollno"
                    name="rollNo"
                    type="text"
                    value={this.state.rollNo}
                    required
                    // onChange={(e) => setRno(e.target.value)}
                    onChange={(e) => this.setState({ rollNo: e.target.value })}
                  />
                </div>
                <div className="con-input">
                  <label htmlFor="course">Course</label>
                  <input
                    placeholder="Eg. BTech"
                    id="course"
                    name="course"
                    value={this.state.details["course"]}
                    type="text"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="con-input">
                  <label htmlFor="branch">Branch</label>
                  <input
                    placeholder="Eg. CSE"
                    id="branch"
                    name="branch"
                    value={this.state.details["branch"]}
                    type="text"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="con-input">
                  <label htmlFor="sem">Semester</label>
                  <input
                    placeholder="Semester"
                    id="sem"
                    name="sem"
                    value={this.state.details["sem"]}
                    type="text"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="con-input">
                  <label htmlFor="college">College Name</label>
                  <input
                    placeholder="College Name"
                    id="college"
                    name="college"
                    value={this.state.details["college"]}
                    type="text"
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <footer>
                <button type="submit" className="btn-login">
                  Submit
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    );
  };

  initAll = (classList) => {
    this.setState({
      redirect: true,
    });
    const obj = {
      details: this.state.details,
      subjects: [],
      crDetails: {
        name: this.state.details.crName,
        rollNo: this.state.rollNo,
        classId: docRef.id,
        email: this.state.user?.email,
      },
      timeTable:
        "https://www.softwaresuggest.com/blog/wp-content/uploads/2019/10/Advantages-of-Timetable-Management-System-in-Schools-1.png",
    };
    docRef.set(obj).then((doc) => {
      const upRef = doc.collection("updates").doc("announcements");
      upRef.set({ announcements: [], assignments: [] });
      const lecRef = doc.collection("lectures").doc("lecturesToday");
      lecRef.set({ lectures: [] });
      const fcmRef = doc.collection("fcmTokens").doc("fcmTokens");
      fcmRef.set({ fcmTokens: [] });
      const detailsRef = doc.collection("details").doc("stuList");
      detailsRef.set({
        studentsList: [
          {
            rollNo: obj.crDetails.rollNo,
            name: obj.crDetails.name,
            email: obj.crDetails.email,
          },
        ],
      });
    });
    classList.remove("loading");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
}

export default AfterSignup;
