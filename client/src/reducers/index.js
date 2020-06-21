import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import exerciseReducer from "./exerciseReducer";
import userChallengeReducer from "./userChallengeReducer";
import toastReducer from "./toastReducer";
import passwordTokenReducer from "./passwordTokenReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    exercises: exerciseReducer,
    userChallenges: userChallengeReducer,
    toasts: toastReducer,
    passwordToken: passwordTokenReducer
});