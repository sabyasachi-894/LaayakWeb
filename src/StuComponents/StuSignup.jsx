import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import M from 'materialize-css';
import firebase from "../firebase";

const db = firebase.firestore();

function StuSignup() {
  const [code, setCode] = useState(""),
    [email, setEmail] = useState(""),
    [name, setName] = useState(""),
    [rno, setRno] = useState(null),
    [pass, setPass] = useState(""),
    [list, setList] = useState([]),
    [duplicate, setDup] = useState(false);

  useEffect(() => {
    if (code) {
      const checkRef = db.collection("classes").doc(code);
      checkRef.get().then((doc) => {
        if (doc.exists) {
          getCurrentList();
        }
      });
    }
    // eslint-disable-next-line
  }, [code]);

  const obj = {
    classCode: code,
    email,
    name,
    rollNo: rno,
    verified: false,
  };

  const getCurrentList = () => {
    const docRef = db
      .collection("classes")
      .doc(code)
      .collection("details")
      .doc("stuList");
    docRef.onSnapshot((doc) => {
      if (doc.data) setList([...doc.data().studentsList]);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(duplicate);
    const classList = e.target.classList;
    classList.add("loading");
    checkDetails(classList);
  };

  const checkRollNo = (rollNo) => {
    setDup(false);
    list.forEach(student => {
      if (student.rollNo === rollNo) {
        setDup(true);
      }
    });
  }

  const checkDetails = (classList) => {
    const docCheck = db.collection("classes").doc(code);
    docCheck
      .get()
      .then(function (doc) {
        if (doc.exists) {
          createUser(classList);
        } else {
          classList.remove("loading");
          M.toast({ html: "Wrong class code was entered, please recheck the entry!", classes: "toast error-toast" })
        }
      })
      .catch(function (error) {
        classList.remove("loading");
        M.toast({ html: error.message, classes: "toast error-toast" })
      });
  };

  const createUser = (classList) => {
    const auth = firebase.auth();
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        classList.remove("loading");
        M.toast({ html: "Registered Successfully", classes: "toast success-toast" })
        if (duplicate) {
          classList.remove("loading");
          M.toast({ html: `Roll No- ${rno} already exists`, classes: "toast error-toast" })
          return
        }
        createDoc();
        addToCRList();
      })
      .catch((err) => {
        classList.remove("loading");
        M.toast({ html: err.message, classes: "toast error-toast" })
      });
  };

  const createDoc = () => {
    const docRef = db.collection("students").doc(email);
    docRef.set(obj);
  };

  const rollNoChange = (e) => {
    setRno(e.target.value);
    checkRollNo(e.target.value);
  }

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

    docRef.update({
      studentsList: firebase.firestore.FieldValue.arrayUnion(user)
    })
      .then(() => {
        window.location.pathname = "/student";
      })
      .catch((err) => {
        M.toast({ html: err.message, classes: "toast error-toast" })
      });
  };

  return (
    <div className="main-container">
      <div className="container-login mx-auto">
        <div className="con-login">
          <h1>Join Your Classmates</h1>
          <form style={{ width: "100%" }}>
            <div className="con-inputs mt-4">
              <div className="con-input">
                <label htmlFor="code">
                  Class Code
                </label>
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
                <input type="text" placeholder="Name" id="name" required onChange={(e) => setName(e.target.value)} />
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
              </div>
              <div className="con-new">
                Already Joined? <Link to="/student/login">Log In</Link>
              </div>
              <footer>
                <button onClick={handleSubmit} type="submit" className="btn-login">
                  Log In
                </button>
              </footer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StuSignup;
