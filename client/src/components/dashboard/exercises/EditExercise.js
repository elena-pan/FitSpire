import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getExercise, updateExercise, deleteExercise } from "../../../actions/exerciseActions";
import classnames from "classnames";
import M from "materialize-css";

import Navbar2 from "../Navbar2";
import validateExercise from "./ValidateExercise";
import LinearLoadingSymbol from "../loading/LinearLoadingSymbol";

class EditExercise extends Component {
    constructor() {
        super();
        this.state = {
            init: false,
            user: {},
            exercise: "",
            start: new Date(),
            end: new Date(),
            errors: {}
        };
        
    }

    componentDidMount() {
        this.props.getExercise(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.errors !== prevProps.errors && this.props.errors) {
            this.setState({
                errors: this.props.errors
            });
        }
        if (this.props.exercise !== null && this.props.exercise !== undefined) {
            if (!this.state.init && this.props.exercise._id && !this.props.exercises.exerciseLoading) {
                let context = this;
                const { exercise } = this.props.exercises;

                this.setState({ exercise: exercise.exercise });
                this.setState({ start: exercise.start });
                this.setState({ end: exercise.end });
        
                // Initialize datepickers and timepickers
                let elem1 = document.querySelectorAll('.datepicker1');
                M.Datepicker.init(elem1, {
                    format: "mmm dd, yyyy",
                    defaultDate: new Date(exercise.start),
                    setDefaultDate: true,
                    autoClose: true,
                    onSelect: function(date) {
                        const time = context.state.start;
                        context.setState({ start: new Date(new Date(time).setFullYear(date.getFullYear(), date.getMonth(), date.getDate()))});
                        const validated = validateExercise({start:context.state.start, end: context.state.end})
                        let prevErrorState = {...context.state.errors};
                        prevErrorState.dates = validated.errors.dates;
                        context.setState({errors: prevErrorState});
                    },
                    minDate: new Date(new Date(exercise.start).setFullYear(new Date(exercise.start).getFullYear() - 1)), // Min date is a year from original date
                    maxDate: new Date(new Date().setDate(new Date().getDate() + 1)) // Max date is a day from now
                });
        
                let elem2 = document.querySelectorAll('.datepicker2');
                M.Datepicker.init(elem2, {
                    format: "mmm dd, yyyy",
                    defaultDate: new Date(exercise.end),
                    setDefaultDate: true,
                    autoClose: true,
                    onSelect: function(date) {
                        const time = context.state.end;
                        context.setState({ end: new Date(new Date(time).setFullYear(date.getFullYear(), date.getMonth(), date.getDate()))});
                        const validated = validateExercise({start:context.state.start, end: context.state.end})
                        let prevErrorState = {...context.state.errors};
                        prevErrorState.dates = validated.errors.dates;
                        context.setState({errors: prevErrorState});
                    },
                    minDate: new Date(new Date(exercise.end).setFullYear(new Date(exercise.end).getFullYear() - 1)), // Min date is a year from original date
                    maxDate: new Date(new Date().setDate(new Date().getDate() + 1)) // Max date is a day from now
                });
        
                let elem3 = document.querySelectorAll('.timepicker1');
                M.Timepicker.init(elem3, {
                    vibrate: false,
                    autoClose: true,
                    twelveHour: false,
                    defaultTime: new Date(exercise.start).toString().substring(16,21),
                    onSelect: function(hour, minute) {
                        let date = context.state.start;
                        context.setState({start: new Date(new Date(date).setHours(hour, minute, 0))});
                        const validated = validateExercise({start:context.state.start, end: context.state.end})
                        let prevErrorState = {...context.state.errors};
                        prevErrorState.dates = validated.errors.dates;
                        context.setState({errors: prevErrorState});
                    }
                });
                
                let elem4 = document.querySelectorAll('.timepicker2');
                M.Timepicker.init(elem4, {
                    vibrate: false,
                    autoClose: true,
                    twelveHour: false,
                    defaultTime: new Date(exercise.end).toString().substring(16,21),
                    onSelect: function(hour, minute) {
                        let date = context.state.end;
                        context.setState({end: new Date(new Date(date).setHours(hour, minute, 0))});
                        const validated = validateExercise({start:context.state.start, end: context.state.end})
                        let prevErrorState = {...context.state.errors};
                        prevErrorState.dates = validated.errors.dates;
                        context.setState({errors: prevErrorState});
                    }
                });

                this.setState({init: true});
            }
        }
    }

    onDeleteExercise = id => {
        if (window.confirm("Are you sure you want to delete this exercise log?")) {
            this.props.deleteExercise(id, this.props.history);
        }
    }
    onChangeExercise = e => {
        this.setState({ exercise: e.target.value })
        const validated = validateExercise({exercise:e.target.value})
        let prevErrorState = {...this.state.errors};
        prevErrorState.exercise = validated.errors.exercise;
        this.setState({errors: prevErrorState});
    }

    onSubmit = e => {
        e.preventDefault();
        const { user } = this.props.auth;
        const exerciseData = {
            user: user,
            exercise: this.state.exercise,
            start: this.state.start,
            end: this.state.end
        }
        this.props.updateExercise(this.props.match.params.id, exerciseData, this.props.history);
    }

    render() {
        const { errors } = this.state;
        const { exercise, exercises, exerciseLoading } = this.props.exercises;

        let content;
        
        if (exercises === null || exerciseLoading) {
            content = (<div style={{marginTop:"5rem"}}><LinearLoadingSymbol /></div>);
        }

        else if (exercise === null) {
            this.props.history.replace("/not-found");
        }

        else {
            content = (
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/dashboard" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Edit Exercise Log</b>
                            </h4>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                        <div className="input-field col s12">
                            <input
                            onBlur={this.onChangeExercise}
                            onChange={this.onChangeExercise}
                            value={this.state.exercise}
                            id="exercise"
                            type="text"
                            className={classnames("", {
                                invalid: errors.exercise
                            })}
                            />
                            <label className="active" htmlFor="exercise">Exercise</label>
                            <span className="red-text">
                                {errors.exercise}
                            </span>
                        </div>
                        <div className="col s12"><span className="black-text">Start</span></div>
                        <div className="col s6">
                            <input type="text" className = "datepicker1"/>
                        </div>
                        <div className="col s6">
                            <input type="text" placeholder="Select Time" className="timepicker1"
                            defaultValue={new Date(exercise.start).toString().substring(16,21)}
                            ></input>
                        </div>
                        <div className="col s12" style={{paddingTop:"2rem"}}><span className="black-text">End</span></div>
                        <div className="col s6">
                            <input type="text"
                            className={classnames("datepicker2", {
                                invalid: errors.dates
                            })}/>
                        </div>
                        <div className="col s6">
                            <input type="text" defaultValue={new Date(exercise.end).toString().substring(16,21)}
                            className={classnames("timepicker2", {
                                invalid: errors.dates
                            })}/>
                        </div>
                        <div className="col s12"><span className="red-text">{errors.dates}</span></div>
                        <div className="col s6" style={{ paddingLeft: "11.250px", paddingTop:"2rem", paddingBottom:"5rem"}}>
                            <button
                            style={{
                                width: "170px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            type="submit"
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                            Edit
                            </button>
                        </div>
                        <div className="col s6" style={{ paddingLeft: "11.250px", paddingTop:"2rem", paddingBottom:"5rem"}}>
                            <Link
                            style={{
                                width: "170px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={() => {this.onDeleteExercise(this.props.match.params.id)}}
                            className="btn btn-large waves-effect waves-light hoverable white black-text accent-3"
                            >
                            Delete
                            </Link>
                        </div>
                        </form>
                    </div>
                </div>
            )
        }

        return (
            <div className="wrapper">
                <Navbar2 />
                <div className="container">
                    { content }
                </div>
            </div>
        );
    }
}
EditExercise.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    exercise: state.exercises.exercise,
    exercises: state.exercises,
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps, 
    { getExercise, updateExercise, deleteExercise }
)(withRouter(EditExercise));