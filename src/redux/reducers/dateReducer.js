import { SELECTED_DATE_UPDATED } from '../actions/actionTypes';
import initState from './initState';

export default function courseReducer(state = initState.date, action) {
  switch (action.type) {
    case SELECTED_DATE_UPDATED:
      return { ...state, selectedDate: action.selectedDate };
    default:
      return state;
  }
}
