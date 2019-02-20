import {
  GET_BEST_SELLER,
  FIND_SHEET_DATA_WITH_SHEET_NAME,
  IS_PAID,
  ADD_SHEET_TO_CART,
  CREATE_SLIDE_IMAGE,
  RESET_IMAGE,
  CREATE_LINE_PAYMENT,
  GET_TOTAL_SHEET,
  GET_ALL_SHEET
} from "../Actions/type";

const initialState = {
  data: [],
  bestSeller: [],
  addCart: [],
  subImg: [],
  totalPrices: 0,
  price: 0,
  longDetail: "",
  pdf: "",
  img: "",
  transactionId: "",
  orderId: "",
  url: "",
  message: "",
  isPaid: false,
  pageNumber: 0,
  isTyping: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BEST_SELLER:
      console.log("dispatching", action);
      return {
        ...state,
        bestSeller: action.product
      };
    case GET_ALL_SHEET:
      console.log("dispatching", action);
      return {
        ...state,
        data: action.product
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
    case FIND_SHEET_DATA_WITH_SHEET_NAME:
      console.log("dispatching", action);
      return {
        ...state,
        price: action.price,
        longDetail: action.longDetail,
        img: action.img
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
    case IS_PAID:
      console.log("dispatching", action);
      return {
        ...state,
        isPaid: action.isPaid
      };
    default:
      return state;
  }
}
