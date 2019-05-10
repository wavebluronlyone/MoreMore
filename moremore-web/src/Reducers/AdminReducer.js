import {
  SIGN_IN_WITH_EMAIL_FOR_ADMIN,
  CREATE_PDF,
  IS_EDIT,
  RESET_ORDER,
  GET_ALL_ORDER_FROM_PROFILE,
  ADMIN_LOGOUT,
  DELETE_SHEET_NAME,
  UPLOAD_IMAGE
} from "../Actions/type";

const initialState = {
  message: "",
  messageAddProduct: "",
  isLoggedIn: false,
  email: "",
  uploadPdf: 0,
  uploadImage: 0,
  image: "",
  subImage: [],
  create: true,
  name: "",
  isEdit: false,
  data: [],
  sheetCount:0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_WITH_EMAIL_FOR_ADMIN:
      console.log("dispatching", action);
      return {
        ...state,
        message: action.text,
        isLoggedIn: action.isLoggedIn,
        email: action.email
      };
    case ADMIN_LOGOUT:
      console.log("dispatching", action);
      return {
        ...state,
        isLoggedIn: action.isloggedIn
      };
    case CREATE_PDF:
      console.log("dispatching", action);
      return {
        ...state,
        uploadPdf: action.uploadPdf,
        messageAddProduct: action.text
      };
    case UPLOAD_IMAGE:
      console.log("dispatching", action);
      return {
        ...state,
        uploadImage: action.uploadImage
      };
    case DELETE_SHEET_NAME:
      console.log("dispatching", action);
      return {
        ...state,
        messageAddProduct: action.text
      };
    case IS_EDIT:
      console.log("dispatching", action);
      return {
        ...state,
        isEdit: action.isEdit,
        name: action.name
      };
    case RESET_ORDER:
      return {
        ...state,
        data: []
      };
    case GET_ALL_ORDER_FROM_PROFILE:
      console.log("dispatching", action);
      return {
        ...state,
		sheetCount: action.sheetCount,
        data: [
          ...state.data,
          {
            name: action.name,
            profile: action.profile,
            price: action.price,
            payment: action.payment,
          }
        ]
      };
    default:
      return state;
  }
}
