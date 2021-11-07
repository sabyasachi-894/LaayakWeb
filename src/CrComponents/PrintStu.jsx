import React from "react";
import firebase from "../firebase";
import M from "materialize-css";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const db = firebase.firestore();

function PrintStu({ student, style, stuList, code }) {
  const [show, setShow] = useState(false);
  const handleKick = () => {
    const newList = stuList.filter((stu) => stu.rollNo !== student.rollNo);
    const stuRef = db.collection("students").doc(student.email);
    setShow(true);
    setTimeout(() => {
      const docRef1 = db
        .collection("classes")
        .doc(code)
        .collection("details")
        .doc("stuList");
      docRef1
        .update({ studentsList: newList })
        .then(() => {
          M.toast({
            html: "Kicked Successfully",
            classes: "toast success-toast",
          });
        })
        .catch((err) =>
          M.toast({ html: err.message, classes: "toast error-toast" })
        );
      stuRef.update({
        classCode: "kicked",
      });
      setShow(false);
    }, 5000);
    // deleting document created
    // const docRef2 = db.collection("students").doc(student.email);

    // docRef2
    //   .delete()
    //   .then(() => {
    //     alert("student document deleted");
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });

    // removing user authentication
    // ...
  };

  return (
    <>
      <Modal
        style={{ height: "100vh" }}
        show={show}
        dialogClassName="modal-dialog-scrollable modal-lg"
      >
        <Modal.Body style={{ padding: 0 }}>
          <img src="/crEjected.gif" alt="ejecting" width="100%" />
        </Modal.Body>
      </Modal>
      <tr>
        <td>{student.rollNo}</td>
        <td>{student.name}</td>
        <td>{student.email}</td>
        <td>
          <img
            onClick={handleKick}
            width="20px"
            style={{ cursor: "pointer" }}
            src="https://cdn4.iconfinder.com/data/icons/web-basics-vol-05/512/user_human_person_avatar_minus_close_delete-512.png"
            alt="kick"
          />
        </td>
      </tr>
    </>
  );
}

export default PrintStu;
