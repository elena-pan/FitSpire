import axios from "axios";
import { addToast } from "./toastActions";

import {
    NEW_USERCHALLENGE,
    UPDATE_USERCHALLENGE,
    DELETE_USERCHALLENGE,
    GET_USERCHALLENGES,
    USERCHALLENGES_LOADING 
} from "./types";

// New user challenge
export const newUserChallenge = () => dispatch => {
  axios.get("/api/user-challenges/new")
    .then(res => 
        dispatch({
            type: NEW_USERCHALLENGE,
            payload: res.data
        })
    )
    .catch(err => console.log(err))
};

// Mark user challenge as viewed (not new)
export const viewedUserChallenge = (id, userChallengeData) => dispatch => {
    axios.post(`/api/user-challenges/update/${id}`, userChallengeData)
    .then(res => {
        dispatch({
            type: UPDATE_USERCHALLENGE,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

// Complete user challenge
export const updateUserChallenge = (id, userChallengeData) => dispatch => {
  axios.post(`/api/user-challenges/update/${id}`, userChallengeData)
    .then(res => {
        dispatch({
            type: UPDATE_USERCHALLENGE,
            payload: res.data
        })
    })
    .then(() => dispatch(addToast("🎉 Challenge completed!")))
    .catch(err => console.log(err))
};

// Delete user challenge
export const deleteUserChallenge = id => dispatch => {
  axios.delete(`/api/user-challenges/${id}`)
    .then(res => 
        dispatch({
            type: DELETE_USERCHALLENGE,
            payload: id
        })
    )
    .catch(err => console.log(err));
};


// User challenges loading
export const setUserChallengesLoading = () => {
    return {
        type: USERCHALLENGES_LOADING
    };
};

// Get user challenges
export const getUserChallenges = () => dispatch => {
    dispatch(setUserChallengesLoading());
    axios.get(`/api/user-challenges`)
    .then(res => {
        dispatch({
            type: GET_USERCHALLENGES,
            payload: res.data
        })
    })
    .catch(err => 
        dispatch({
            type: GET_USERCHALLENGES,
            payload: null
      })
    );
};