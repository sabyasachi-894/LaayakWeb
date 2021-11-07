import React from "react";

function ShowTimetable({ tt }) {
  const style = {
    margin: "30px 0",
    width: "700px",
    borderRadius: "10px",
    boxShadow: "23px 23px 46px #5a7a8b, -23px -23px 46px #7aa4bd",
  };
  return (
    <div>
      <img style={style} src={tt} alt="time table" />
    </div>
  );
}

export default ShowTimetable;
