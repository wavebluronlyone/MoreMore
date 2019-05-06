import {
  GET_BEST_SELLER,
  FIND_SHEET_DATA_WITH_SHEET_NAME,
  IS_PAID,
  ADD_SHEET_TO_CART,
  CREATE_SLIDE_IMAGE,
  RESET_IMAGE,
  CREATE_LINE_PAYMENT,
  GET_TOTAL_SHEET,
  GET_ALL_SHEET,
  GET_NEW_ARRIVAL,
  GET_TOTAL_USER_PAYMENT,
  BUY_COMPLETE,
  FIND_SHEET_DATA_WITH_PROFILE
} from "../Actions/type";

const initialState = {
  data: [],
  bestSeller: [],
  newArrival: [],
  sheetDataProfile: [],
  addCart: [],
  subImg: [],
  totalPrices: 0,
  price: 0,
  longDetail: "",
  pdf: "",
  img: "",
  profile: "",
  transactionId: "",
  orderId: "",
  url: "",
  message: "",
  totalUser: 0,
  isPaid: false,
  pageNumber: 0,
  isTyping: 0,
  input:""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BEST_SELLER:
      console.log("dispatching", action);
      return {
        ...state,
        bestSeller: action.product
      };
    case GET_NEW_ARRIVAL:
      console.log("dispatching", action);
      return {
        ...state,
        newArrival: action.product
      };
    case GET_ALL_SHEET:
      console.log("dispatching", action);
      return {
        ...state,
        data: action.product,
		input:action.input
      };
    case GET_TOTAL_USER_PAYMENT:
      return {
        ...state,
        totalUser: action.total
      };
    case GET_TOTAL_SHEET:
      return {
        ...state,
        pageNumber: action.pageNumber,
        isTyping: action.isTyping
      };
    case CREATE_SLIDE_IMAGE:
      console.log("dispatching", action);
      return {
        ...state,
        subImg: action.subImage
      };
    case FIND_SHEET_DATA_WITH_PROFILE:
      console.log("dispatching", action);
      return {
        ...state,
        sheetDataProfile: action.product
      };
    case FIND_SHEET_DATA_WITH_SHEET_NAME:
      console.log("dispatching", action);
      return {
        ...state,
        price: action.price,
        longDetail: action.longDetail,
        img: action.img,
        profile: action.profile
      };
    case ADD_SHEET_TO_CART:
      console.log("dispatching", action);
      return {
        ...state,
        addCart: action.product,
        totalPrices: action.total,
        message: action.message
      };
    case RESET_IMAGE:
      return {
        ...state,
        subImg: [],
        message: "",
        sheetDataProfile: [],
        profile: "",
        price: 0
      };
    case CREATE_LINE_PAYMENT:
      return {
        ...state,
        transactionId: action.transactionId,
        orderId: action.orderId,
        url: action.url,
        price: action.price,
        message: action.message
      };
    case BUY_COMPLETE:
      return {
        ...state,
        message: action.message
      };
    case IS_PAID:
      console.log("dispatching", action);
      return {
        ...state,
        message: ""
      };
    default:
      return state;
  }
}
