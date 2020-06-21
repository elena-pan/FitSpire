import {
    ADD_EXERCISE,
    UPDATE_EXERCISE,
    DELETE_EXERCISE,
    GET_EXERCISE,
    EXERCISE_LOADING,
    GET_EXERCISES,
    EXERCISES_LOADING
} from "../actions/types";

const initialState = {
    exercises: [],
    exercise: [],
    exerciseLoading: false,
    exercisesLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_EXERCISE:
        return {
          ...state,
          exercises: [action.payload, ...state.exercises]
        };
      case UPDATE_EXERCISE:
        let index = state.exercises.findIndex(
          exercise => exercise._id === action.payload._id
        );
  
        state.exercises.splice(index, 1);
  
        return {
          ...state,
          exercises: [action.payload, ...state.exercises]
        };
      case DELETE_EXERCISE:
        return {
            ...state,
            exercises: state.exercises.filter(
                exercise => exercise._id !== action.payload
            )
        };
      case GET_EXERCISE:
        return {
          ...state,
          exercise: action.payload,
          exerciseLoading: false
        };
      case GET_EXERCISES:
        return {
          ...state,
          exercises: action.payload,
          exercisesLoading: false
        };
      case EXERCISE_LOADING:
        return {
          ...state,
          exerciseLoading: true
        };
      case EXERCISES_LOADING:
        return {
          ...state,
          exercisesLoading: true
        };
      default:
        return state;
    }
}