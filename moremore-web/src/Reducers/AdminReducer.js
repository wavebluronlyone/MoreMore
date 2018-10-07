import { SIGN_IN_WITH_EMAIL_FOR_ADMIN, ADMIN_LOGOUT } from "../Actions/type";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_WITH_EMAIL_FOR_ADMIN:
      console.log("dispatching", action);
      return {
        ...state,
        message: action.text,
        isLoggedIn: action.isloggedIn,
        email: action.email
      };
    case ADMIN_LOGOUT:
      console.log("dispatching", action);
      return {
        ...state,
        isLoggedIn: action.isloggedIn
      };
    default:
      return state;
  }
}
