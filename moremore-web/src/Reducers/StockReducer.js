import { GET_STOCK } from "../Actions/type";

const initialState = {
  data: []
}


export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STOCK:
      return {
        ...state,
        data: [...state.data,
          {
            name: action.shop,
            is_Admin: action.is_admin
          }
        ]
      };
    default:
      return state;
  }
}
