import {
  GET_BEST_SELLER,
  FIND_DATA_WITH_NAME,
  FIND_PDF_WITH_NAME,
  GET_ALL_PRODUCT,
  IS_PAID,
  ADD_PRODUCT_TO_CART
} from "../Actions/type";

const initialState = {
  data: [],
  addCart: [],
  price: 0,
  longDetail: "",
  pdf: "",
  img: "",
  isPaid: false,
  message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    // case GET_BEST_SELLER:
    //   console.log("dispatching", action);
    //   if (state.data.length > 2) {
    //     return state;
    //   } else {
    //     return {
    //       ...state,
    //       data: [
    //         ...state.data,
    //         {
    //           name: action.sheetName,
    //           price: action.prices,
    //           short_description: action.shortDetail
    //         }
    //       ]
    //     };
    //   }
    case GET_ALL_PRODUCT:
      return {
        ...state,
        data: action.product
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
        addCart: [
          ...state.addCart,
          {
            name: action.product
          }
        ],
        message: action.message
      };
    case FIND_PDF_WITH_NAME:
      console.log("dispatching", action);
      return {
        ...state,
        pdf: action.pdfFile
      };
    case IS_PAID:
      console.log("dispatching", action);
      return {
        ...state,
        isPaid: action.isPaid
      };
    default:
      console.log("dispatching", state);
      return state;
  }
}
