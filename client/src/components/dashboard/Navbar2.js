import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUserChallenges } from "../../actions/userChallengeActions";
import { connect } from "react-redux";

class Navbar2 extends Component {

    componentDidMount = () => {
        this.props.getUserChallenges();
    }

    render() {
        let badge = (<div></div>);
        const { userChallenges, userChallengesLoading } = this.props.userChallenges;

        if (userChallenges !== null && !userChallengesLoading) {
            const numUncompleted = userChallenges.filter(userChallenge => userChallenge.completed === false).length
            if (numUncompleted) {
                badge = (<span className="new badge blue" style={{marginLeft:"0.5rem",minWidth:"1.5rem",borderRadius:"50%"}} data-badge-caption="">{ numUncompleted }</span>)
            }
        }
        return (
            <div className="navbar-fixed">
            <nav className="z-depth-0">
                <div className="nav-wrapper grey">
                    <div className="container">
                    <ul className="left">
                        <li style={{paddingRight:"2rem"}}>
                            <Link to="/dashboard">
                                <b>Dashboard</b>
                            </Link>
                        </li>
                        <li style={{paddingLeft:"2rem"}}>
                            <Link to="/challenges">
                                <b>Challenges</b>
                                { badge }
                            </Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userChallenges: state.userChallenges
});

export default connect(
  mapStateToProps,
  { getUserChallenges }
)(Navbar2);