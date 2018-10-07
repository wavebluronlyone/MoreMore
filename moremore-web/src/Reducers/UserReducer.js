import {
  SIGN_IN_WITH_EMAIL,
  FIND_PROFILE_WITH_EMAIL,
  FIND_PDF_WITH_EMAIL,
  LOGOUT
} from "../Actions/type";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_WITH_EMAIL:
      console.log("dispatching", action);
      return {
        ...state,
        message: action.text,
        isLoggedIn: action.isloggedIn,
        email: action.email,
        pdf: action.pdfFile
      };
    case FIND_PROFILE_WITH_EMAIL:
      console.log("dispatching", action);
      return {
        ...state,
        username: action.myUser
      };
    case FIND_PDF_WITH_EMAIL:
      console.log("dispatching", action);
      return {
        ...state,
        name: action.sheetName,
        pdf: action.pdfFile
      };
    case LOGOUT:
      console.log("dispatching", action);
      return initialState;
    default:
      return state;
  }
}
