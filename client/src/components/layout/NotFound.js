import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Navbar2 from "../dashboard/Navbar2";

class NotFound extends Component {
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
            <div style={{ minHeight: "75vh" }} className="container">
                    <h2 className="grey-text center" style={{marginTop:"10rem"}}>
                        404 Not Found <br/>
                        <h4>Return to <Link to="/">home</Link></h4>
                    </h2>
            </div>
        </div>
    );
  }
}

NotFound.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(NotFound);