import React from "react";

function ShowTimetable({ tt }) {
  console.log(tt);
  return (
    <div>
      <img src={tt} alt="time table" />
    </div>
  );
}

export default ShowTimetable;
