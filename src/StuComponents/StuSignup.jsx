import React, { useState } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import firebase from "../firebase";
import ShowPassword from "../ShowPassword";
import { auth } from "firebase";

const db = firebase.firestore();

const StuSignup = () => {
  const [code, setCode] = useState(""),
    [email, setEmail] = useState(""),
    [name, setName] = useState(""),
    [rno, setRno] = useState(null),
    [pass, setPass] = useState("");
  // [list, setList] = useState([]),
  // [duplicate, setDup] = useState(false);

  // useEffect(() => {
  //   if (code) {
  //     const checkRef = db.collection("classes").doc(code);
  //     checkRef.get().then((doc) => {
  //       if (doc.exists) {
  //         getCurrentList();
  //       }
  //     });
  //   }
  //   // eslint-disable-next-line
  // }, [code]);

  // const getCurrentList = () => {
  //   const docRef = db
  //     .collection("classes")
  //     .doc(code)
  //     .collection("details")
  //     .doc("stuList");
  //   docRef.onSnapshot((doc) => {
  //     if (doc.data) setList([...doc.data().studentsList]);
  //   });
  // };

  const rollNoChange = (e) => {
    setRno(e.target.value);
    // checkRollNo(e.target.value);
  };

  const checkRollNo = (rollNo, list) => {
    // setDup(false);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i].rollNo === rollNo) {
        // setDup(true);
        return true;
      }
    }
    if (i === list.length) {
      return false;
    }
  };

  // // // SUBMIT // // //

  const handleSubmit = (e) => {
    e.preventDefault();
    const classList = e.target.classList;
    classList.add("loading");
    createUser(classList);
  };

  // Step-1 Authenticate User
  const createUser = (classList) => {
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((user) => {
        user.user
          .updateProfile({
            displayName: "student",
          })
          .then(() => {
            checkDetails(classList);
          });
      })
      .catch((err) => {
        classList.remove("loading");
        M.toast({ html: err.message, classes: "toast error-toast" });
      });
  };

  // Step-2 Check Details(Class-code)
  const checkDetails = (classList) => {
    const docCheck = db.collection("classes").doc(code);
    docCheck
      .get()
      .then((doc) => {
        if (doc.exists) {
          doc.ref
            .collection("details")
            .doc("stuList")
            .get()
            .then((details) => {
              if (checkRollNo(rno, details.data().studentsList)) {
                auth().currentUser.delete();
                classList.remove("loading");
                M.toast({
                  html: `Roll No- ${rno} already exists`,
                  classes: "toast error-toast",
                });
                return;
              }
              createDoc();
              addToCRList();
              classList.remove("loading");
              M.toast({
                html: "Registered Successfully",
                classes: "toast success-toast",
              });
            });
        } else {
          auth().currentUser.delete();
          classList.remove("loading");
          M.toast({
            html: "Wrong class code was entered, please recheck the entry!",
            classes: "toast error-toast",
          });
        }
      })
      .catch((error) => {
        auth().currentUser.delete();
        classList.remove("loading");
        M.toast({ html: error.message, classes: "toast error-toast" });
      });
  };

  // Step-3 Create Student document

  // Document to be added
  const obj = {
    classCode: code,
    email,
    name,
    rollNo: rno,
    verified: false,
  };
  //
  const createDoc = () => {
    const docRef = db.collection("students").doc(email);
    docRef.set(obj).catch((err) => {
      auth().currentUser.delete();
      M.toast({ html: err.message, classes: "toast error-toast" });
    });
  };

  // Step-4 Add student data to class document
  const addToCRList = () => {
    const docRef = db
      .collection("classes")
      .doc(code)
      .collection("details")
      .doc("stuList");
    const user = {
      rollNo: obj.rollNo,
      name: obj.name,
      email: obj.email,
    };
    if (auth().currentUser?.displayName === "student") {
      docRef
        .update({
          studentsList: firebase.firestore.FieldValue.arrayUnion(user),
        })
        .then(() => {
          window.location.pathname = "/student";
        })
        .catch((err) => {
          auth().currentUser.delete();
          M.toast({ html: err.message, classes: "toast error-toast" });
        });
    }
  };
  // // // // // // // // // // // //

  return (
    <div className="main-container">
      <div className="container-login mx-auto">
        <div className="con-login">
          <h1>Join Your Classmates</h1>
          <form style={{ width: "100%" }}>
            <div className="con-inputs mt-4">
              <div className="con-input">
                <label htmlFor="code">Class Code</label>
                <input
                  placeholder="Code provided by CR"
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="con-input">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  id="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="con-input">
                <label htmlFor="rollno">Roll Number</label>
                <input
                  placeholder="Roll Number"
                  id="rollno"
                  type="text"
                  required
                  // onChange={(e) => setRno(e.target.value)}
                  onChange={rollNoChange}
                />
              </div>
              <div className="con-input">
                <label htmlFor="email">Email</label>
                <input
                  placeholder="Email"
                  id="email"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="con-input">
                <label htmlFor="password">Password:</label>
                <input
                  placeholder="Password"
                  id="password"
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
                <ShowPassword />
              </div>
              <div className="con-new">
                Already Joined? <Link to="/student/login">Log In</Link>
              </div>
              <footer>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="btn-login"
                >
                  Log In
                </button>
              </footer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StuSignup;
