import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/home.css";
import "./assets/css/Login.css";
import "./assets/css/mainPage.css";
import "./assets/css/loadingButton.css";
import MainNavBar from "./NavBar/mainNavBar";
import Loader from "./Loader/Loader";

const Home = lazy(() => import("./home"));
const StuLanding = lazy(() => import("./StuComponents/stuLanding"));
const StuSignup = lazy(() => import('./StuComponents/StuSignup'));
const CrLanding = lazy(() => import("./CrComponents/crLanding"));
const About = lazy(() => import("./about"));
const NewCr = lazy(() => import("./CrComponents/newCr"));
const CrDetails = lazy(() => import("./CrComponents/afterSignup"));
const TeacherDetails = lazy(() => import("./Teacher/AfterSignup"));
const Landing = lazy(() => import("./Teacher/Landing"));
const NewTeacher = lazy(() => import("./Teacher/NewTeacher"));
const ClassDetails = lazy(() => import("./Teacher/ClassDetails"));
const classDetails = lazy(() => import("./CrComponents/ClassDetails"));
const TeacherLogin = lazy(() => import("./Teacher/TeacherLogin"));
const CrLogin = lazy(() => import("./CrComponents/crLogin"));
const NotFound = lazy(() => import("./NotFound/NotFound"));
const StuLogin = lazy(() => import("./StuComponents/StuLogin"));
const Profile = lazy(() => import("./StuComponents/profile/Profile"));

function App() {
  document.getElementsByTagName("body")[0].classList.add(localStorage.getItem("mode"));
  return (
    <div className="App">
      <Router>
        <MainNavBar />
          <Suspense fallback={<Loader />}>
            <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/student" exact component={StuLanding} />
            <Route path="/student/login" exact component={StuLogin} />
            <Route path="/student/signup" exact component={StuSignup} />
            <Route path="/student/profile" exact component={Profile} />
            <Route path="/newcr" exact component={NewCr} />
            <Route path="/newcr/details" exact component={CrDetails} />
            <Route path="/cr" exact component={CrLanding} />
            <Route path="/cr/login" exact component={CrLogin} />
            <Route path="/cr/class" exact component={classDetails} />
            <Route path="/teacher" exact component={Landing} />
            <Route path="/teacher/login" exact component={TeacherLogin} />
            <Route path="/teacher/class" exact component={ClassDetails} />
            <Route path="/newteacher" exact component={NewTeacher} />
            <Route path="/newteacher/details" exact component={TeacherDetails} />
            <Route path="/about" exact component={About} />
            <Route path="/" component={NotFound} />
            </Switch>
          </Suspense>
      </Router>
    </div>
  );
}

export default App;
