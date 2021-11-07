import React from "react";
import ShowTimetable from "../../CrComponents/ShowTimetable";
import DarkToggle from "../../DarkToggle/DarkToggle";
import Details from "./Details";

const Profile = ({ onHide, doc, type, tt }) => {
  return (
    <div className="container-fluid">
      <div className="code-head-btn">
        <DarkToggle />
        <h1 className="mainPageHeading" style={{ marginTop: "-3vh" }}>
          Your Details
        </h1>
        <i
          onClick={onHide}
          className="fa fa-home"
          style={{ cursor: "pointer", fontSize: "30px", color: "#000" }}
        ></i>
      </div>
      {/* student details */}
      <Details details={doc} type={type} />
      <div id="Details">
        <h2 className="subHeading">Class Details: </h2>
      </div>
      <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />
      <h1 id="Timetable">Time Table</h1>
      <ShowTimetable tt={tt} />
    </div>
  );
};

export default Profile;
