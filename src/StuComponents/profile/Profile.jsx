import React from 'react';
import { Link } from 'react-router-dom';
import DarkToggle from '../../DarkToggle/DarkToggle';
import Details from './Details';

const Profile = (props) => {
    return (
        <div className="container-fluid">
            <div className="code-head-btn">
                <DarkToggle />
                <h1 className="mainPageHeading" style={{ marginTop: "-3vh" }}>
                    Class Details
                </h1>
                <Link className="float-md-right mb-2 mr-2" to="/student">
                    <i className="fa fa-home" style={{ fontSize: "30px", color: "#000" }}></i>
                </Link>
            </div>
            {/* student details */}
            < div id="Details" >
                <h2 className="subHeading">Your Details: </h2>
            </ div>
            <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />
            <Details details={props.location.state.doc} type={props.location.state.type} />
        </div>
    );
}

export default Profile;
