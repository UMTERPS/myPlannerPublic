import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import apiCallsInProgress from './apiStatusReducer';
import date from './dateReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
  date
});

export default rootReducer;
