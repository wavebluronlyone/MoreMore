import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import StockReducer from "./StockReducer";
import UserReducer from "./UserReducer";
import AdminReducer from "./AdminReducer";

const rootReducer = combineReducers({
  stock: StockReducer,
  form: formReducer,
  user: UserReducer,
  admin: AdminReducer
});

export default rootReducer;
