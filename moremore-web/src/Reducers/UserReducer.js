import {
  SIGN_IN_WITH_EMAIL,
  FIND_PROFILE_WITH_EMAIL,
  FIND_PDF_WITH_EMAIL,
  LOGOUT,
  RESET_USER,
  FIND_PDF_WITH_SHEET_NAME,
  RESET_SHEET_PDF,
  RESET_MESSAGE,
  GET_SHEET_GROUP,
  GET_COMMENT,
  RESET_COMMENT,
  GET_TOTAL_PAYMENT
} from "../Actions/type";

const initialState = {
  data: [],
  addCart: [],
  message: "",
  isloggedIn: Boolean(localStorage.getItem("isloggedIn")),
  email: "",
  username: "",
  pdf: "",
  image: "",
  positive: "",
  commentArray: [],
  pageNumber: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_WITH_EMAIL:
      // console.log("dispatching", action);
      return {
        ...state,
        message: action.text,
        isLoggedIn: action.isloggedIn,
        positive: action.positive,
        email: action.email
      };
    case FIND_PROFILE_WITH_EMAIL:
      // console.log("dispatching", action);
      return {
        ...state,
        username: action.myUser,
        image: action.image
      };
    case GET_COMMENT:
      // console.log("dispatching", action);
      return {
        ...state,
        commentArray: action.comment
      };
    case RESET_COMMENT:
      // console.log("dispatching", action);
      return {
        ...state,
        commentArray: []
      };
    case FIND_PDF_WITH_EMAIL:
      // console.log("dispatching", action);
      return {
        ...state,
        data: action.product
      };
    case FIND_PDF_WITH_SHEET_NAME:
      return {
        ...state,
        pdf: action.product
      };
    case GET_TOTAL_PAYMENT:
      return {
        ...state,
        pageNumber: action.pageNumber
      };
    case GET_SHEET_GROUP:
      // console.log("dispatching", action);
      return {
        ...state,
        addCart: action.product
      };
    case RESET_MESSAGE:
      // console.log("dispatching", action);
      return {
        ...state,
        message: ""
      };
    case RESET_USER:
      // console.log("dispatching", action);
      return {
        ...state,
        data: []
      };
    case RESET_SHEET_PDF:
      // console.log("dispatching", action);
      return {
        ...state,
        pdf: action.pdf
      };
    case LOGOUT:
      // console.log("dispatching", action);
      return initialState;
    default:
      return state;
  }
}
