import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import StockReducer from './StockReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  stock: StockReducer,
  form: formReducer,
  user: UserReducer
});

export default rootReducer;