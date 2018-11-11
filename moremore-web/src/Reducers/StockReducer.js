import {
  GET_BEST_SELLER,
  FIND_DATA_WITH_NAME,
  FIND_PDF_WITH_NAME,
  GET_ALL_PRODUCT,
  RESET
} from "../Actions/type";

const initialState = {
  data: [],
  price: 0,
  longDetail: "",
  pdf: "",
  img: ""
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
      console.log("get_all_product", action);
      return {
        ...state,
        data: [
          ...state.data,
          {
            name: action.name,
            img: action.img,
            hiLight: action.hiLight,
            price: action.price,
            profile: action.profile
          }
        ]
      };
    case FIND_DATA_WITH_NAME:
      console.log("dispatching", action);
      return {
        ...state,
        price: action.price,
        longDetail: action.longDetail,
        img: action.img
      };
    case FIND_PDF_WITH_NAME:
      console.log("dispatching", action);
      return {
        ...state,
        pdf: action.pdfFile
      };
    case RESET:
      return initialState;
    default:
      console.log("dispatching", state);
      return state;
  }
}
