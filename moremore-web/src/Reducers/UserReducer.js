import { SIGN_IN_WITH_EMAIL } from "../Actions/type";

const initialState = {
  message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_WITH_EMAIL:
      return {
        ...state,
        message: action.text
      };
    default:
      return state;
  }
}
