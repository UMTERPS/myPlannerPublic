import {
  UPDATE_NOTE_STATUS,
  NOTE_CONTENT_FETCHED
} from '../actions/actionTypes';
import initState from './initState';
import _ from 'lodash';

export default function layoutReducer(state = initState.notes, action) {
  switch (action.type) {
    case UPDATE_NOTE_STATUS:
      return { ...state, status: action.status };
    case NOTE_CONTENT_FETCHED:
      return {
        ...state,
        contents: _.extend({}, state.contents, action.data)
      };
    default:
      return state;
  }
}
