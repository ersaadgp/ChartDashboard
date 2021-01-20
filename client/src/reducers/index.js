import { combineReducers } from 'redux';
import data from './data.reducer';
import spesific from './spesific.reducer';

export default combineReducers({
  data,
  spesific
});
