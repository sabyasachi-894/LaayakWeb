import React, { Component } from "react";
import firebase from "../firebase";
import Modal from "react-bootstrap/Modal";

class AddAssign extends Component {
  state = {
    show: false,
    url: "",
    title: "",
    fileName: "",
    assign: {},
    isOfficial: true,
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

  styles = {
    position: "fixed",
    background: "pink",
    color: "black",
    width: "60%",
    height: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 1,
    boxShadow: "2px 2px 10px 10px rgba(255, 31, 255, 0.226)",
  };

  render() {
    console.log(this.state);

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
            <form>{this.getForm()}</form>
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

  setUrlName = (url, fileName) => {
    if (url && fileName) {
      this.setState({ url, fileName });
    }
  };

  uploadAssign = () => {
    const { assign } = this.state;
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
        function progress(snapshot) {},
        function error(err) {},
        function complete() {
          alert("File uploaded successfully!");
          storageRef
            .getDownloadURL()
            .then((url) => {
              this.setUrlName(url, assign.name);
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
        <button className="btn btn-success m-2" onClick={this.hideModal}>
          Add Assignment
        </button>
      </div>
    );
  };

  // callAddPoll = (e) => {
  //   e.preventDefault(); // preventing reload
  //   const newPoll = {
  //     dateAndTime: firebase.firestore.Timestamp.fromDate(new Date()),
  //     type: "poll",
  //     text: this.state.text,
  //     yesOption: this.state.yesOption,
  //     noOption: this.state.noOption,
  //     yesCount: 0,
  //     noCount: 0,
  //     isOfficial: this.state.isOfficial,
  //   };
  //   console.log(newPoll);
  //   this.props.addPoll(newPoll);
  //   this.setState({
  //     text: "",
  //     yesOption: "",
  //     noOption: "",
  //     isOfficial: false,
  //   });
  // };
}

export default AddAssign;
