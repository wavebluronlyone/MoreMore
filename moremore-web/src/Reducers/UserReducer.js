import {
  SIGN_IN_WITH_EMAIL,
  FIND_PROFILE_WITH_EMAIL,
  FIND_PDF_WITH_EMAIL,
  LOGOUT,
  RESET_USER
} from "../Actions/type";

const initialState = {
  data: [],
  message: "",
  isloggedIn: false,
  email: "",
  username: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_WITH_EMAIL:
      console.log("dispatching", action);
      return {
        ...state,
        message: action.text,
        isLoggedIn: action.isloggedIn,
        email: action.email
      };
    case FIND_PROFILE_WITH_EMAIL:
      console.log("dispatching", action);
      return {
        ...state,
        username: action.myUser
      };
    case FIND_PDF_WITH_EMAIL:
      return {
        ...state,
        data: action.product
      };
    case RESET_USER:
      console.log("dispatching", action);
      return {
        data: []
      };
    case LOGOUT:
      console.log("dispatching", action);
      return initialState;
    default:
      return state;
  }
}
