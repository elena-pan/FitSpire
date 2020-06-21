import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Navbar2 from "../dashboard/Navbar2";

class About extends Component {

  render() {
    let navBar2;
    if (this.props.auth.isAuthenticated) {
        navBar2 = <Navbar2 />
    }
    else {
        navBar2 = <div></div>
    }
    return (
        <div className="wrapper">
            { navBar2 }
            <div className="center">
            <div className="section blue" style={{ height:"400px", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div><h2 className="container" style={{ lineHeight:"110%" }}><b>Complete challenges, log your progress, and reach your goals</b></h2></div>
            </div>
            <div className="container section" style={{paddingTop:"2rem", paddingBottom:"3rem"}}>
              <div className="col s12" style={{paddingBottom:"0.25rem"}}><h4><b>About FitSpire</b></h4></div>
              <h6 className="col s12 flex-text" style={{ lineHeight:"170%" }}>
                Creating and maintaining healthy habits is important for everyone, but much easier said than done.
                FitSpire provides you with the accountability and boost of motivation so you can reach your goals. 
                It is completely free to sign up and use, with no credit card required and no locked features, so why not start now?
              </h6>
            </div>
            <div className="section">
              <img style={{objectFit:"cover", width:"100%", maxHeight:"300px" }} src="https://www.vmcdn.ca/f/files/via/import/2017/12/31113259_shutterstock_749969473.jpg;w=960" alt=""></img>
            </div>
            <div className="container section" style={{paddingTop:"2rem", paddingBottom:"3rem"}}>
              <div className="col s12" style={{paddingBottom:"0.25rem"}}><h4><b>Exercise Tracking</b></h4></div>
              <h6 className="col s12 flex-text" style={{ lineHeight:"150%" }}>
                Studies have shown that people who consistently track their exercise and activities are more 
                likely to keep up their habits and achieve their goals, which is why FitSpire makes it easy and convenient. 
                You can also view your progress and stats to see if you're on track!
              </h6>
            </div>
            <div className="section">
              <img style={{objectFit:"cover", width:"100%", maxHeight:"300px" }} src="https://i.pcmag.com/imagery/articles/06A0yVqekWQSdRVJzFou1Ht-22.fit_scale.size_2698x1517.v1575682800.jpg" alt=""></img>
            </div>
            <div className="container section" style={{paddingTop:"2rem", paddingBottom:"3rem"}}>
              <div className="col s12" style={{paddingBottom:"0.25rem"}}><h4><b>Challenges</b></h4></div>
              <h6 className="col s12" style={{ lineHeight:"150%" }}>
                Our fitness challenges are designed to motivate you to try out new activities and inspire
                you to push yourself further, so regardless of whether you're just beginning your journey, or
                have been on this path for many years, FitSpire will help you reach your goals and stay motivated.
              </h6>
            </div>
            <div className="section">
              <img style={{objectFit:"cover", width:"100%", maxHeight:"300px" }} src="https://media1.popsugar-assets.com/files/thumbor/jp6K-pFqFbg31m3-UFYZa-UeB2o/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/10/30/747/n/1922729/fc7e106b60c618b9_6-sat-sun-long-run/i/Saturday-or-Sunday-Long-Run-Outside.jpg" alt=""></img>
            </div>
            <div className="container section" style={{paddingTop:"5rem", paddingBottom:"5rem"}}>
              <div className="col s12" style={{paddingBottom:"0.25rem"}}><h4><b>Ready to level up your fitness journey?</b></h4></div>
              <Link style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "2rem",
                marginBottom:"2rem"
              }}
              to="/register"
              className="btn btn-large waves-effect waves-light hoverable blue accent-3">
              Register
              </Link>
            </div>
          </div>
          </div>
    );
  }
}

About.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(About);