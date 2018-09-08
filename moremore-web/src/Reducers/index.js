import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import StockReducer from './StockReducer';

const rootReducer = combineReducers({
  stock: StockReducer,
  form: formReducer
});

export default rootReducer;