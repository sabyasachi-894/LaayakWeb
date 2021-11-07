import React, { Component } from "react";
import Details from "../StuComponents/details";
import Announcement from "./Announcement";
import Announce from "./Announce";
import AddPoll from "./AddPoll";
import AddLink from "./AddLink";
import firebase from "../firebase";
import BottomNav from "../BottomNav/bnav";
import DarkToggle from "../DarkToggle/DarkToggle";
import AddAssign from "./addAssign";
import ShowAssign from "./showAssign";
let db = firebase.firestore();

class ClassDetails extends Component {
  isMount = false;
  state = {
    details: [],
    announcements: [],
    assignments: [],
    classId: this.props.classCode,
  };

  collRef = db.collection("classes");
  docRef = this.collRef.doc(this.state.classId);
  collRefUp = this.docRef.collection("updates");
  docRefUp = this.collRefUp.doc("announcements");

  componentDidMount() {
    this.isMount = true;
    this.docRef.onSnapshot((doc) => {
      if (doc.data()) {
        if (this.isMount) {
          this.setState({
            details: doc.data().details,
          });
        }
      }
    });
    this.docRefUp.onSnapshot((doc) => {
      if (doc.data()) {
        if (this.isMount) {
          this.setState({
            assignments: doc.data().assignments,
          });
        }
        doc.data().announcements.forEach((announcement) => {
          if (announcement.isOfficial) {
            if (this.isMount) {
              this.setState({
                announcements: this.state.announcements.concat(announcement),
              });
            }
          }
        });
        this.sortAnnouncements();
        this.sortAssignments();
      }
    });
  }
  UNSAFE_componentWillMount() {
    this.isMount = false;
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="code-head-btn">
          <DarkToggle />
          <h1 className="mainPageHeading" style={{ marginTop: "-3vh" }}>
            Class Details
          </h1>
          <i
            onClick={this.props.onHide}
            className="fa fa-home float-md-right mb-2 mr-2"
            style={{ cursor: "pointer", fontSize: "30px", color: "#000" }}
          ></i>
        </div>
        {/* semester details */}
        <h2 id="Details" className="subHeading">
          Info:{" "}
        </h2>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />
        <Details details={this.state.details} onEdit={this.handleDetailsEdit} />
        {/* Assignments */}
        <div id="Assignments">
          <h2 className="subHeading">
            Assignments
            <span role="img" aria-label="assignments">
              📝
            </span>
          </h2>
          <hr className="mb-4" style={{ margin: "0 auto", width: "40%" }} />
          <AddAssign
            addAssign={this.addAssignment}
            classCode={this.state.classId}
          />
          {this.state.assignments.length ? (
            this.state.assignments.map((assignment) => (
              <ShowAssign
                key={assignment.url}
                onDelete={this.deleteAssignment}
                details={assignment}
              />
            ))
          ) : (
            <h4 style={{ textAlign: "center", width: "100%" }}>
              No Assignments pending for the class
            </h4>
          )}
        </div>
        {/* Announcement/polls/links */}
        <div id="Announcements">
          <div className="d-inline container-fluid">
            <h2 className="subHeading">
              Manage Announcements{" "}
              <span role="img" aria-label="announcement">
                📢
              </span>
            </h2>
            <hr className="mb-4" style={{ margin: "0 auto", width: "40%" }} />
          </div>

          <div className="d-flex justify-content-center mb-4">
            <Announce AddAnnouncement={this.AddAnnouncement} />
            <AddPoll addPoll={this.AddAnnouncement} />
            <AddLink addLink={this.AddAnnouncement} />
          </div>

          <div className="key-container">
            <h5 className="m-2" style={{ textDecoration: "underline" }}>
              Key
            </h5>
            <div className="poll-card m-2" style={{ width: "150px" }}>
              <span className="p-2">
                <span role="img" className="mr-1" aria-label="announcement">
                  📢{" "}
                </span>{" "}
                Announcements
              </span>
            </div>
            <div className="poll-card m-2" style={{ width: "75px" }}>
              <span className="p-2">
                <span role="img" className="mr-1" aria-label="announcement">
                  🔗
                </span>
                Links
              </span>
            </div>
            <div className="poll-card m-2" style={{ width: "75px" }}>
              <span className="p-2">
                <span role="img" className="mr-1" aria-label="announcement">
                  🗳️
                </span>
                Polls
              </span>
            </div>
          </div>
        </div>
        <div className="m-4 mx-n3 ann-container">
          {this.state.announcements.map((announcement) => (
            <Announcement
              key={announcement.dateAndTime}
              announcement={announcement}
              onDelete={this.deleteAnnouncement}
            />
          ))}
        </div>
        <BottomNav paths={["Details", "Assignments", "Announcements"]} />
      </div>
    );
  }
  sortAnnouncements = () => {
    let temp = this.state.announcements;
    for (let i = 0; i < temp.length; i++) {
      for (let j = i + 1; j < temp.length; j++) {
        if (temp[i].dateAndTime < temp[j].dateAndTime) {
          let x = temp[i];
          temp[i] = temp[j];
          temp[j] = x;
        }
      }
    }
    this.setState({
      announcements: temp,
    });
  };
  sortAssignments = () => {
    let temp = this.state.assignments;
    for (let i = 0; i < temp.length; i++) {
      for (let j = i + 1; j < temp.length; j++) {
        if (temp[i].dateAndTime < temp[j].dateAndTime) {
          let x = temp[i];
          temp[i] = temp[j];
          temp[j] = x;
        }
      }
    }
    this.setState({
      assignments: temp,
    });
  };
  AddAnnouncement = (newAnnouncement) => {
    this.docRefUp.update({
      announcements: firebase.firestore.FieldValue.arrayUnion(newAnnouncement),
    });
    this.setState({
      announcements: [],
    });
  };
  deleteAnnouncement = (announcement) => {
    this.docRefUp.update({
      announcements: firebase.firestore.FieldValue.arrayRemove(announcement),
    });
    this.setState({
      announcements: [],
    });
  };
  addAssignment = (newAssign) => {
    this.docRefUp.update({
      assignments: firebase.firestore.FieldValue.arrayUnion(newAssign),
    });
  };
  deleteAssignment = (assign) => {
    const fileRef = firebase
      .storage()
      .ref(`assignment/${this.state.classId}/${assign.fileName}`);
    fileRef.delete().then(() => {
      alert("Deleted Successfully");
    });
    this.docRefUp.update({
      assignments: firebase.firestore.FieldValue.arrayRemove(assign),
    });
  };
}
export default ClassDetails;
