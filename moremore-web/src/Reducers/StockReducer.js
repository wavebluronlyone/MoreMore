import {
  GET_BEST_SELLER,
  FIND_DATA_WITH_NAME,
  FIND_PDF_WITH_NAME,
  GET_ALL_PRODUCT,
  IS_PAID,
  ADD_PRODUCT_TO_CART,
  CREATE_SLIDE_IMAGE,
  RESET_IMAGE,
  CREATE_LINE_PAYMENT,
  GET_TOTAL_PRODUCT,
  INPUT_CHANGE,
  RESET_STOCK
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
    case INPUT_CHANGE:
      return {
        ...state,
        input: action.input
      };
    case GET_ALL_PRODUCT:
      console.log("dispatching", action);
      return {
        ...state,
        data: action.product
      };
    case GET_TOTAL_PRODUCT:
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
    case FIND_DATA_WITH_NAME:
      console.log("dispatching", action);
      return {
        ...state,
        price: action.price,
        longDetail: action.longDetail,
        img: action.img
      };
    case ADD_PRODUCT_TO_CART:
      console.log("dispatching", action);
      return {
        ...state,
        addCart: action.product,
        totalPrices: action.total,
        message: action.message
      };
    case FIND_PDF_WITH_NAME:
      console.log("dispatching", action);
      return {
        ...state,
        pdf: action.pdfFile
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
    case RESET_STOCK:
      console.log("dispatching", action);
      return {
        ...state,
        data: []
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
