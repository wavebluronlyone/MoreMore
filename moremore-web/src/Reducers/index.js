import { combineReducers } from 'redux';
import StockReducer from './StockReducer';

const rootReducer = combineReducers({
  stock: StockReducer
});

export default rootReducer;