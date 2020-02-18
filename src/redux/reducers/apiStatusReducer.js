import * as types from "../actions/actionTypes";
import initialState from "./initState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    actionTypeEndsInSuccess(action.type) ||
    action.type === types.API_CALL_FAILED
  ) {
    return state - 1;
  }

  return state;
}
