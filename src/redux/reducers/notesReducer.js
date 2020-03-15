import { UPDATE_NOTE_STATUS } from '../actions/actionTypes';
import initState from './initState';

export default function layoutReducer(state = initState.notes, action) {
  switch (action.type) {
    case UPDATE_NOTE_STATUS:
      return { ...state, status: action.status };
    default:
      return state;
  }
}
