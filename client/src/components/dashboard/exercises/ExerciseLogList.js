import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import M from "materialize-css";
import { getExercises, deleteExercise } from "../../../actions/exerciseActions";

import LinearLoadingSymbol from "../loading/LinearLoadingSymbol";

class ExerciseLogList extends Component {

    state = {
        selection: "Today",
        start: new Date(new Date().setHours(0,0,0,0)),
        end: new Date(new Date().setHours(0,0,0,0)),
        toTextClassName: "grey-text",
        disableDatepickers: true
    };

    componentDidMount= () => {
        this.props.getExercises();
        let elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);

        let context = this;
        let elem1 = document.querySelectorAll('.datepicker1');
        M.Datepicker.init(elem1, {
            format: "mmm dd, yyyy",
            autoClose: true,
            onSelect: function(date) {
                context.setState({ start: new Date(new Date(date).setHours(0,0,0,0))});
            }
        });
        let elem2 = document.querySelectorAll('.datepicker2');
        M.Datepicker.init(elem2, {
            format: "mmm dd, yyyy",
            autoClose: true,
            onSelect: function(date) {
                context.setState({ end: new Date(new Date(date).setHours(0,0,0,0))});
            }
        });
    }

    setDatepickers = enable => {
        if (enable) {
            this.setState({ disableDatepickers: "" });
            this.setState({ toTextClassName: "" });
        }
        else {
            this.setState({ disableDatepickers: true });
            this.setState({ toTextClassName: "grey-text" });
        }
    }

    onSelectChange = e => {
        this.setState({ selection: e.target.value });
        if (e.target.value === "Custom") {
            this.setDatepickers(true);
        }
        else {
            this.setDatepickers(false);
        }
    }

    deleteExercise(id) {
        if (window.confirm("Are you sure you want to delete this exercise log?")) {
            this.props.deleteExercise(id, this.props.history);
        }
    }

    render() {
        let content;
        let totalHours = 0;
        let totalLogs = 0;

        const { exercises, exercisesLoading } = this.props.exercises;
        
        if (exercises === null || exercisesLoading) {
            content = (<tr><td colSpan="5"><LinearLoadingSymbol /></td></tr>);
        }
        else {
            let exercisesFiltered;
            switch (this.state.selection) {
                case "Today":
                    exercisesFiltered = exercises.filter(exercise => {
                        const exerciseDate = new Date(new Date(exercise.start).setHours(0,0,0,0)).getTime();
                        const today = new Date(new Date().setHours(0,0,0,0)).getTime();
                        return exerciseDate === today;
                    });
                    break;
                case "Past 7 days":
                    exercisesFiltered = exercises.filter(exercise => {
                        const exerciseDate = new Date(new Date(exercise.start).setHours(0,0,0,0)).getTime();
                        const today = new Date(new Date().setHours(0,0,0,0)).getTime();
                        const past7 = today - 7 * (24 * 60 * 60 * 1000);
                        return exerciseDate <= today && exerciseDate >= past7;
                    });
                    break;
                case "Past 30 days":
                    exercisesFiltered = exercises.filter(exercise => {
                        const exerciseDate = new Date(new Date(exercise.start).setHours(0,0,0,0));
                        const today = new Date(new Date().setHours(0,0,0,0));
                        const past30 = today - 30 * (24 * 60 * 60 * 1000);
                        return exerciseDate <= today && exerciseDate >= past30;
                    });
                    break;
                case "Custom":
                    exercisesFiltered = exercises.filter(exercise => {
                        const exerciseDate = new Date(new Date(exercise.start).setHours(0,0,0,0));
                        const start = this.state.start.getTime();
                        const end = this.state.end.getTime();
                        return exerciseDate <= end && exerciseDate >= start;
                    });
                    break;
                default:
                    exercisesFiltered = exercises;
            }
            let exerciseData = exercisesFiltered
                .sort((a, b) => (new Date(a.start).getTime() < new Date(b.start).getTime()) ? 1 : -1) // Sort by start time
                .map(exercise => (
                    <tr>
                        <td>{exercise.exercise}</td>
                        <td>{new Date(exercise.start).toString().substring(16,21)
                        + " | " + new Date(exercise.start).toString().substring(4,10) + 
                        ", " + new Date(exercise.start).toString().substring(11, 15)}</td>
                        <td>{new Date(exercise.end).toString().substring(16,21)
                        + " | " +new Date(exercise.end).toString().substring(4,10) + 
                        ", " + new Date(exercise.start).toString().substring(11, 15)}</td>
                        <td>{exercise.duration + " minutes"}</td>
                        <td>
                            <Link to={"/exercises/edit/"+exercise._id}>Edit</Link> | <Link to="#" onClick={() => { this.deleteExercise(exercise._id) }}>Delete</Link>
                        </td>
                    </tr>
                )
            );
            if (exercisesFiltered.length > 0) {
                content = (exerciseData)
                totalLogs = exercisesFiltered.length;
                totalHours = exercisesFiltered.reduce((acc, next) => acc + next.duration, 0);
                totalHours = Math.round(totalHours/60);
            }
            else {
                content = (<tr><td colSpan="5"><h3 className="header flow-text grey-text" style={{marginLeft:"0.25rem"}}>You have not logged any exercises for this time period</h3></td></tr>)
            }
        }
        return (
            <div>
                <div style={{marginBottom:"1rem"}}>
                    <div style={{display:"inline-block", width:"15%", minWidth:"9rem", verticalAlign:"top"}}>
                        <select onChange={this.onSelectChange}>
                            <option value="Today">Today</option>
                            <option value="Past 7 days">Past 7 days</option>
                            <option value="Past 30 days">Past 30 days</option>
                            <option value="All">All</option>
                            <option value="Custom">Custom range</option>
                        </select>
                    </div>
                    <div style={{display:"inline-block", width:"15%", minWidth:"8rem", marginLeft:"2.5rem"}}>
                        <input disabled={this.state.disableDatepickers} type="text" className="datepicker1"/>
                    </div>
                    <div className={this.state.toTextClassName} style={{display:"inline-block", marginLeft:"0.5rem"}}>
                        to
                    </div>
                    <div style={{display:"inline-block", width:"15%", minWidth:"8rem", marginLeft:"1rem"}}>
                        <input disabled={this.state.disableDatepickers} type="text" className="datepicker2"/>
                    </div>
                    <div className="right" style={{display:"inline-block"}}>
                        <h5 style={{display:"inline-block", marginRight:"0.25rem"}}><b>{totalHours}</b></h5>
                        <h6 style={{display:"inline-block", marginRight:"1rem"}}>hours total</h6>
                        <h5 style={{display:"inline-block"}}>  |  </h5>
                        <h5 style={{display:"inline-block", marginLeft:"1rem"}}><b>{totalLogs}</b></h5> 
                        <h6 style={{display:"inline-block", marginLeft:"0.25rem"}}> activities logged</h6>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                        <th>Exercise</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Duration</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { content }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    exercises: state.exercises
});
export default connect(
  mapStateToProps,
  { getExercises, deleteExercise }
)(withRouter(ExerciseLogList));