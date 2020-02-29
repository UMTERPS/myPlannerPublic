import { LAYOUT_UPDATED } from '../actions/actionTypes';
import initState from './initState';

export default function layoutReducer(state = initState.layout, action) {
  switch (action.type) {
    case LAYOUT_UPDATED:
      return { ...state, ...action.layout };
    default:
      return state;
  }
}
