import React, { Component } from "react";

import Navbar2 from "./Navbar2";
import ExerciseLogList from "./exercises/ExerciseLogList";

class Dashboard extends Component {

    onAddExerciseClick = e => {
        e.preventDefault();
        this.props.history.push("/log-exercise")
    }
    render() {
        return (
            <div className="wrapper">
                <Navbar2 />
                <div style={{ minHeight: "75vh", marginBottom:"5rem" }} className="container">
                    <div className="row">
                    <div className="col s12 left-align">
                        <button
                            style={{
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "3rem",
                                marginBottom: "2rem"
                            }}
                            onClick={this.onAddExerciseClick}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                            Log Exercise
                        </button>
                        <ExerciseLogList />
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Dashboard;