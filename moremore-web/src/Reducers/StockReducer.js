import { GET_STOCK } from "../Actions/StockActions";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_STOCK:
      return {
        ...state,
        name: [...state, action.shop],
        is_Admin: [...state, action.is_admin]
      };
    default:
      return state;
  }
}
