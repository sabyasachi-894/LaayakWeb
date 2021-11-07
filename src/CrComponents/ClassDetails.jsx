import React, { Component } from "react";
import Details from "../CrComponents/details";
import firebase from "../firebase";
import BottomNav from "../BottomNav/bnav";
import DarkToggle from "../DarkToggle/DarkToggle";
import StuList from "./StuList";
import Timetable from "./Timetable";
import ShowTimetable from "./ShowTimetable";
let db = firebase.firestore();

class classDetails extends Component {
  isMount = false;
  state = {
    details: this.props.details,
    classId: this.props.classId,
  };

  collRef = db.collection("classes");
  docRef = this.collRef.doc(this.state.classId);

  componentDidMount() {}
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
            className="fa fa-home"
            style={{ cursor: "pointer", fontSize: "30px", color: "#000" }}
          ></i>
        </div>
        {/* semester details */}
        <h2 id="Details" className="subHeading">
          Info:{" "}
        </h2>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />

        <Details details={this.state.details} onEdit={this.handleDetailsEdit} />

        <h2 id="Timetable" className="subHeading">
          Time Table
          <Timetable classCode={this.state.classId} />
          <ShowTimetable tt={this.props.tt} />
        </h2>

        {/* students details */}
        <h2 id="Students" className="subHeading">
          Students:{" "}
        </h2>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />
        <StuList crEmail={this.props.email} code={this.state.classId} />
        <BottomNav paths={["Details", "Students"]} />
      </div>
    );
  }
}
export default classDetails;
