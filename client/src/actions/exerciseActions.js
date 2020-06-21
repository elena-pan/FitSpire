import axios from "axios";
import { addToast } from "./toastActions"

import {
    GET_ERRORS,
    ADD_EXERCISE,
    UPDATE_EXERCISE,
    DELETE_EXERCISE,
    GET_EXERCISE,
    EXERCISE_LOADING,
    GET_EXERCISES,
    EXERCISES_LOADING
} from "./types";

// Add exercise 
export const addExercise = (exerciseData, history) => dispatch => {
  axios.post("/api/exercises/add", exerciseData)
    .then(res => 
        dispatch({
            type: ADD_EXERCISE,
            payload: res.data
        })
    )
    .then(() => history.push("/dashboard")) // re-direct to dashboard on success
    .then(() => dispatch(addToast("Exercise logged!", "success")))
    .catch(err =>{
        if (err) {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        })}
        else console.log(err);
    })
};

// Update exercise
export const updateExercise = (id, exerciseData, history) => dispatch => {
  axios.post(`/api/exercises/update/${id}`, exerciseData)
    .then(res => {
        dispatch({
            type: UPDATE_EXERCISE,
            payload: res.data
        })
    })
    .then(res => history.push('/dashboard'))
    .then(() => dispatch(addToast("Exercise log updated!", "success")))
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
};

// Delete exercise
export const deleteExercise = (id, history) => dispatch => {
  axios.delete(`/api/exercises/${id}`)
    .then(res => 
        dispatch({
            type: DELETE_EXERCISE,
            payload: id
        })
    )
    .then(res => history.replace("/dashboard"))
    .then(() => dispatch(addToast("Exercise log deleted", "error")))
    .catch(err => console.log(err));
};

// Exercise loading
export const setExerciseLoading = () => {
    return {
      type: EXERCISE_LOADING
    };
};

// Exercises loading
export const setExercisesLoading = () => {
    return {
        type: EXERCISES_LOADING
    };
};

// Get exercise
export const getExercise = id => dispatch => {
    dispatch(setExerciseLoading());
    axios.get(`/api/exercises/${id}`)
    .then(res => {
        dispatch({
            type: GET_EXERCISE,
            payload: res.data
        })
    })
    .catch(err => 
        dispatch({
            type: GET_EXERCISE,
            payload: null
      })
    );
};

// Get exercises
export const getExercises = () => dispatch => {
    dispatch(setExercisesLoading());
    axios.get(`/api/exercises`)
    .then(res => {
        dispatch({
            type: GET_EXERCISES,
            payload: res.data
        })
    })
    .catch(err => 
        dispatch({
            type: GET_EXERCISES,
            payload: null
      })
    );
};
