import { combineReducers } from 'redux';
import date from './dateReducer';
import layout from './layoutReducer';
import notes from './notesReducer';
import locale from './localeReducer';

const rootReducer = combineReducers({
  date,
  layout,
  notes,
  locale
});

export default rootReducer;
