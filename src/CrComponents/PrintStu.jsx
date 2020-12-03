import React from "react";
import firebase from "../firebase";
import M from "materialize-css";

const db = firebase.firestore();

function PrintStu({ student, style, stuList, code }) {
  const handleKick = () => {
    // deleting from class list
    const newList = stuList.filter((stu) => stu.rollNo !== student.rollNo);
    const stuRef = db.collection("students").doc(student.email);
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
  );
}

export default PrintStu;
