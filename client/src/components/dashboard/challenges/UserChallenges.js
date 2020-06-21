import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserChallenges, updateUserChallenge } from "../../../actions/userChallengeActions";

import LinearLoadingSymbol from "../loading/LinearLoadingSymbol";
import Navbar2 from "../Navbar2";

class UserChallenges extends Component {

    componentDidMount = () => {
        this.props.getUserChallenges();
    }

    onCompletedChallengeClick = (id, userChallengeData) => { 
        if (window.confirm("Are you sure you would like to complete this challenge?")) {
            this.props.updateUserChallenge(id, userChallengeData);
        }
    }

    render() {
        let content;

        const { userChallenges, userChallengesLoading } = this.props.userChallenges;
        
        if (userChallenges === null || userChallengesLoading) {
            content = (<div style={{marginTop:"5rem"}}><LinearLoadingSymbol /></div>);
        }
        else {
            let userChallengeData = userChallenges
                .filter(userChallenge => userChallenge.completed === false) // only display uncompleted challenges
                .map(userChallenge => (
                    <div className="card horizontal">
                        <div className="card-image" style={{marginLeft:"1rem", marginTop:"0.25rem"}}>
                            <i className="large material-icons">fitness_center</i>
                        </div>
                        <div className="card-content flow-text" style={{width:"100%"}}>{userChallenge.challenge}</div>
                        <div className="card-action">
                            <button style={{
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                height:"100%"
                            }}
                            onClick={() => this.onCompletedChallengeClick(userChallenge._id, { completed: true })}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                            Complete
                            </button>
                        </div>
                    </div>
                )
            );

            if (userChallengeData.length > 0) {
                content = (<div style={{marginTop:"5rem"}}>{ userChallengeData }</div>)
            }
            else {
                content = (<h4 className="grey-text center" style={{marginTop:"6rem"}}>You currently have no challenges</h4>)
            }
        }

        return (
            <div className="wrapper">
                <Navbar2 />
                    <div style={{ minHeight: "90vh" }} className="container">
                        { content }
                    </div>
            </div>
        );
    }
}
UserChallenges.propTypes = {
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    userChallenges: state.userChallenges,
    errors: state.errors
});

export default connect(
  mapStateToProps,
  { getUserChallenges, updateUserChallenge }
)(UserChallenges);