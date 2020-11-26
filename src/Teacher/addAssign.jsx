import React, { Component } from "react";
import firebase from "../firebase";
import Modal from "react-bootstrap/Modal";
import M from "materialize-css";

class AddAssign extends Component {
  state = {
    show: false,
    url: "",
    title: "",
    fileName: "",
    assign: {},
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
          Upload Assignment
        </button>

        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="modal-dialog-scrollable modal-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 className="mt-2">Add Assignment Details:</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.callAddAssign}>{this.getForm()}</form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  browseFile = (e) => {
    const assign = e.target.files[0];
    if (assign) {
      this.setState({ assign });
    }
  };

  uploadAssign = () => {
    const { assign } = this.state;
    const setUrlName = (url, fileName) => {
      if (url && fileName) {
        this.setState({ url, fileName });
      }
    };
    if (assign) {
      // create storage ref
      const storageRef = firebase
        .storage()
        .ref(`assignment/${this.props.classCode}/${assign.name}`);

      // upload file
      const task = storageRef.put(assign);

      // update progress bar
      task.on(
        "state_changed",
        function progress(snapshot) { },
        function error(err) { },
        function complete() {
          alert("File uploaded successfully!");
          storageRef
            .getDownloadURL()
            .then((url) => {
              setUrlName(url, assign.name);
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
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Title
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Title / Subject"
              onChange={(e) => {
                this.setState({ title: e.target.value });
              }}
              name="title"
              required
            />
          </div>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile02"
              onChange={this.browseFile}
              required
            />
            <label
              className="custom-file-label"
              htmlFor="inputGroupFile02"
              aria-describedby="inputGroupFileAddon02"
            >
              {this.state.assign.name ? this.state.assign.name : "Choose File"}
            </label>
          </div>
          <div className="input-group-append">
            <span
              className="input-group-text"
              id="inputGroupFileAddon02"
              onClick={this.uploadAssign}
              style={{ cursor: "pointer" }}
            >
              Upload
            </span>
          </div>
        </div>
        <button
          className="btn btn-success m-2"
          type="submit"
        // onClick={this.hideModal}
        >
          Add Assignment
        </button>
      </div>
    );
  };

  callAddAssign = (e) => {
    e.preventDefault(); // preventing reload
    if (this.state.fileName) {
      const { url, title, fileName } = this.state;
      const newAssign = {
        dateAndTime: firebase.firestore.Timestamp.fromDate(new Date()),
        url: url,
        title: title,
        fileName: fileName,
        isOfficial: true,
      };
      this.props.addAssign(newAssign);
      this.setState({
        url: "",
        title: "",
        fileName: "",
        assign: {},
        show: false,
      });
      this.hideModal();
    } else {
      M.toast({ html: "Please upload file first", classes: "toast error-toast" })
    }
  };
}

export default AddAssign;
