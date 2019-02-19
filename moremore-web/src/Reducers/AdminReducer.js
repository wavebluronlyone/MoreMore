import {
  SIGN_IN_WITH_EMAIL_FOR_ADMIN,
  ADMIN_LOGOUT,
  CREATE_PDF,
  IS_EDIT,
  GET_ALL_ORDER_FROM_PROFILE,
  SHOW_IMAGE,
  SHOW_SUB_IMAGE,
  REMOVE_SUB_IMAGE,
  RESET_ORDER,
  DELETE_PRODUCT,
  RESET_MESSAGE_ADD_PRODUCT
} from "../Actions/type";

const initialState = {
  message: "",
  messageAddProduct: "",
  isLoggedIn: false,
  email: "",
  pdf: "",
  image: "",
  subImage: [],
  create: true,
  name: "",
  isEdit: false,
  data: []
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
        pdf: action.pdfFile,
        messageAddProduct: action.text
      };
    case SHOW_IMAGE:
      console.log("dispatching", action);
      return {
        ...state,
        image: action.image
      };
    case SHOW_SUB_IMAGE:
      console.log("dispatching", action);
      return {
        ...state,
        subImage: action.subImage
      };
    case REMOVE_SUB_IMAGE:
      console.log("dispatching", action);
      return {
        ...state,
        subImage: []
      };
    case DELETE_PRODUCT:
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
    case RESET_MESSAGE_ADD_PRODUCT:
      console.log("dispatching", action);
      return {
        messageAddProduct: ""
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
        data: [
          ...state.data,
          {
            name: action.name,
            profile: action.profile,
            price: action.price,
            payment: action.payment
          }
        ]
      };
    default:
      return state;
  }
}
