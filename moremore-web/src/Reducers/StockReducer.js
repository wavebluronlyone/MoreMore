import { GET_BEST_SELLER } from "../Actions/type";

const initialState = {
  data: []
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
    default:
      return state;
  }
}
