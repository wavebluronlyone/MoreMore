import { GET_BEST_SELLER, FIND_DATA_WITH_NAME } from "../Actions/type";

const initialState = {
  data: [],
  price: 0,
  product_description: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BEST_SELLER:
      if (state.data.length > 2) {
        return state;
      } else {
        return {
          ...state,
          data: [
            ...state.data,
            {
              name: action.sheetName,
              price: action.prices,
              short_description: action.shortDetail
            }
          ]
        };
      }
    case FIND_DATA_WITH_NAME:
      return {
        ...state,
        price: action.prices,
        product_description: action.longDetail
      };
    default:
      return state;
  }
}
