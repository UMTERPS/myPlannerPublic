import { combineReducers } from 'redux';
import date from './dateReducer';
import layout from './layoutReducer';

const rootReducer = combineReducers({
  date,
  layout
});

export default rootReducer;
