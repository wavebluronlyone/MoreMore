import { SIGN_IN_WITH_EMAIL, FIND_PROFILE_WITH_EMAIL, FIND_PDF_WITH_EMAIL, LOGOUT } from "../Actions/type";

const initialState = {
  isAdmin: 2
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_WITH_EMAIL:
      return {
        ...state,
        message: action.text,
        isLoggedIn: action.isloggedIn,
        email: action.email,
        isAdmin: action.isAdmin,
        pdf: action.pdfFile
      };
    case FIND_PROFILE_WITH_EMAIL:
      return {
        ...state,
        username: action.myUser,
        isAdmin: action.isAdmin
      };
    case FIND_PDF_WITH_EMAIL:
      return {
        ...state,
        name: action.sheetName,
        pdf: action.pdfFile
      };
      case LOGOUT:
      return initialState
    default:
      return state;
  }
}
