import {
    NEW_USERCHALLENGE,
    UPDATE_USERCHALLENGE,
    DELETE_USERCHALLENGE,
    GET_USERCHALLENGES,
    USERCHALLENGES_LOADING 
} from "../actions/types";

const initialState = {
    userChallenges: [],
    userChallengesLoading: false,
    new: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case NEW_USERCHALLENGE:
        return {
          ...state,
          userChallenges: [action.payload, ...state.userChallenges]
        };
      case UPDATE_USERCHALLENGE:
        let index = state.userChallenges.findIndex(
            userChallenge => userChallenge._id === action.payload._id
        );
  
        state.userChallenges.splice(index, 1);
  
        return {
          ...state,
          userChallenges: [action.payload, ...state.userChallenges]
        };
      case DELETE_USERCHALLENGE:
        let index2 = state.userChallenges.findIndex(
            userChallenge => userChallenge._id === action.payload
        );

        state.userChallenges.splice(index2, 1);

        return {
            ...state,
            userChallenges: [...state.userChallenges]
        };
      case GET_USERCHALLENGES:
        return {
          ...state,
          userChallenges: action.payload,
          userChallengesLoading: false
        };
      case USERCHALLENGES_LOADING:
        return {
          ...state,
          userChallengesLoading: true
        };
      default:
        return state;
    }
}