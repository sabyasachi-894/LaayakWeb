import React, { Component } from "react";
import Card from "./Card";
import Contact from "./Contact/Contact";
import "./type";

class Home extends Component {

  getHeader = () => {
    return (
      <header className="titleheader">
          <div className="content">
            <div>
                <h1>Link Aaya Kya ?</h1>
            </div>
            <h2>You can <span class="role" data-wait='3000'
                    data-words='["Manage links","Manage Assignments","Manage your Timetable"]'
                    ></span></h2>
          </div>
        <div className="box1 box"></div>
        <div className="box2 box"></div>
        <div className="box3 box"></div>
        <div className="box4 box"></div>
        <div className="box5 box"></div>
      </header>
    );
  };

  getHomePage = () => {
    return (
      <div className="home-page">
        {this.getHeader()}
        <div className="get-started">
          <h1>Get Started</h1>
           <Card
            details={[
              {
                head: "Teacher",
                content: "Teachers are kindly requested to register themselves on Laayak through sinup/login portal",
                bg: "images/dp1.jpg",
                href: "/teacher",
                diffClass: "teacher"
              },
              {
                head: "Class Representative",
                content: "CRs can register their class and add subjects using Teacher ID through sinup/login portal",
                bg: "images/dp2.jpg",
                href: "/cr",
                diffClass: "CR"
              },
              {
                head: "Student",
                content: "Students can join their class on Laayak using code provided by CR through sinup/login portal",
                bg: "images/dp3.jpg",
                href: "/student",
                diffClass: "student"
              }
            ]}
          /> 
        </div>
        <hr />
        <Contact />
      </div>
    );
  };

  render() {
    return this.getHomePage()
  }
}

export default Home;
