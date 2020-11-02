import React, { Component } from "react";
import Card from "./Card";
import Contact from "./Contact/Contact";


class Home extends Component {
  getHeader = () => {
    return (
      <header className="titleheader">
        <h1 className="title">Link Aaya Kya?</h1>
        <div className="image mx-auto">
          <div className="container-fluid">
            <img
              className="img-fluid"
              src={require("../assets/image/title.png")}
              alt="this is img"
            />
          </div>
        </div>
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
                content: "Ask teachers to register their themselves on Laayak",
                bg: "images/teacher.jpg",
                href: "/teacher"
              },
              {
                head: "Class Representative",
                content: "CRs can register their class and add subjects using Teacher ID",
                bg: "images/cr.jpg",
                href: "/cr"
              },
              {
                head: "Student",
                content: "Students can join their class on Laayak using code provided by CR",
                bg: "images/student.png",
                href: "/student"
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
