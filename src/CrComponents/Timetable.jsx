import React, { Component } from "react";
import firebase from "../firebase";
import Modal from "react-bootstrap/Modal";
import M from "materialize-css";

const db = firebase.firestore();

class Timetable extends Component {
  state = {
    show: false,
    tt: {},
    progress: 0,
  };

  // toggle show state
  showModal = () => {
    this.setState({ show: true });
  };
  hideModal = () => {
    this.setState({ show: false });
  };

  // modal show/hide class
  showHideClassName = () => (this.state.show ? "" : "d-none");

  render() {
    return (
      <div>
        <button className="btn-lg btn-info m-1" onClick={this.showModal}>
          Edit Timetable
        </button>
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="modal-dialog-scrollable modal-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 className="mt-2">Upload time table here:</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.uploadtt}>{this.getForm()}</form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  browseFile = (e) => {
    const tt = e.target.files[0];
    if (tt && tt.type.split("/")[0] === "image") {
      this.setState({ tt });
    } else {
      M.toast({
        html: "Please select a valid image",
        classes: "toast error-toast",
      });
    }
  };

  uploadtt = (e) => {
    e.preventDefault();
    const { tt } = this.state;
    const uploadTimetable = (url) => {
      alert("called");
      if (url) {
        const docRef = db.collection("classes").doc(this.props.classCode);
        docRef.update({
          timeTable: url,
        });
        document.getElementById("progress").classList.add("hide");
        this.hideModal();
      } else {
        M.toast({
          html: "Please upload an image first",
          classes: "toast error-toast",
        });
      }
    };
    const setProgress = (progress) => {
      if (progress) {
        this.setState({ progress });
      }
    };
    if (tt.name) {
      document.getElementById("progress").classList.remove("hide");
      // create storage ref
      const storageRef = firebase
        .storage()
        .ref(`timetables/${this.props.classCode}/timetable`);

      // upload file
      const task = storageRef.put(tt);

      // update progress bar
      task.on(
        "state_changed",
        function progress(snapshot) {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
          setProgress(progress);
        },
        function error(err) {},
        function complete() {
          M.toast({
            html: "Uploaded Successfully",
            classes: "toast success-toast",
          });
          storageRef
            .getDownloadURL()
            .then((url) => {
              uploadTimetable(url);
            })
            .catch((err) => console.log(err));
        }
      );
    }
  };

  getForm = () => {
    return (
      <div>
        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile02"
              onChange={this.browseFile}
              accept="image/*"
              required
            />
            <label
              className="custom-file-label"
              htmlFor="inputGroupFile02"
              aria-describedby="inputGroupFileAddon02"
            >
              {this.state.tt.name ? this.state.tt.name : "Choose File"}
            </label>
          </div>

          <div className="input-group">
            <button
              className="btn btn-sm btn-success"
              type="submit"
              style={{ margin: "5px auto", width: "20%" }}
            >
              Upload
            </button>
          </div>
          <div className="input-group">
            <progress
              id="progress"
              className="custom-progress-bar hide"
              value={this.state.progress}
              max="100"
            >
              {" "}
            </progress>
          </div>
        </div>
      </div>
    );
  };
}

export default Timetable;
