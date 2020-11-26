import React, { Component } from "react";
import { months } from "./Announcement";

class ShowAssign extends Component {
  state = {};

  download = (url) => {
    var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0].split("%2F")[2];
    filename = decodeURIComponent(filename);
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var a = document.createElement('a');
      a.href = window.URL.createObjectURL(xhr.response);
      a.download = filename; // Name the file anything you'd like.
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
    };
    xhr.open('GET', url);
    xhr.send();
  }

  displayAssignment = () => {
    const { dateAndTime, title, url } = this.props.details;
    let dateTime = dateAndTime.toDate();
    const date = dateTime.getDate();

    const month = months[dateTime.getMonth() - 1];
    const year = dateTime.getFullYear();
    let hour = dateTime.getHours();
    let min = "00",
      mins = dateTime.getMinutes();
    mins < 10 ? (min = "0" + String(mins)) : (min = String(mins));
    return (
      <>
        <div className="ann-preview">
          <h3><span role="img" className="emoji" aria-label="assignment">📝</span></h3>
        </div>
        <div className="ann-info text-left">
          <h6 style={{ width: "fit-content" }} className="mb-3">{month} {date}, {year} at {hour}:{min}</h6>
          <h4>{title}</h4>
          <span
            onClick={() => this.download(url)}
            className="btn link-btn btn-primary mt-2 float-right"
          >
            Download File
              </span>
          <div style={{ position: "absolute", top: "5%", right: "1%" }}>
            <button
              className="btn"
            onClick={() => this.props.onDelete(this.props.details)}
            >
              <span role="img" aria-label="delete">❌</span>
            </button>
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <div className="up-container d-flex flex-column container-fluid">
        <div className="up mx-auto">
          {this.displayAssignment()}
        </div>
      </div>
    )
  }
}

export default ShowAssign;
