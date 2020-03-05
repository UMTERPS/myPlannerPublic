import { combineReducers } from 'redux';
import date from './dateReducer';
import layout from './layoutReducer';
import notes from './notesReducer';

const rootReducer = combineReducers({
  date,
  layout,
  notes
});

export default rootReducer;
