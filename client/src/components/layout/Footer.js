import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
        <footer className="page-footer grey">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text" style={{ fontFamily: "monospace" }}>FitSpire</h5>
                <p className="grey-text text-lighten-4">Complete challenges, log your progress, and reach your goals</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h6 className="white-text" style={{marginTop:"1.5rem"}}><b>Links</b></h6>
                <ul>
                  <li><Link className="grey-text text-lighten-3" to="/about">About</Link></li>
                  <li><Link className="grey-text text-lighten-3" to="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright"></div>
        </footer>
    );
  }
}

export default Footer;