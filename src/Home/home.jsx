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
                bg: "http://theteachersdigest.com/wp-content/uploads/2014/10/Vectors-272.png",
                href: "/teacher"
              },
              {
                head: "Class Representative",
                content: "CRs can register their class and add subjects using Teacher ID",
                bg: "https://cdn.pixabay.com/photo/2017/10/11/11/43/multi-tasking-2840792_960_720.jpg",
                href: "/cr"
              },
              {
                head: "Student",
                content: "Students can join their class on Laayak using code provided by CR",
                bg: "https://cdn.pixabay.com/photo/2016/04/01/11/10/boy-1300226_960_720.png",                
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
