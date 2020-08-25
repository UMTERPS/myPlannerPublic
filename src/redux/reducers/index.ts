import { combineReducers } from 'redux';
import date from './dateReducer';
import layout from './layoutReducer';
import notes from './notesReducer';
import settings from './settingsReducer';

const rootReducer = combineReducers({
  date,
  layout,
  notes,
  settings
});

export default rootReducer;
