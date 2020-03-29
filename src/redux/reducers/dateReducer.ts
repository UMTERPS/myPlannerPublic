import { SELECTED_DATE_UPDATED } from '../actions/actionTypes';
import { initState } from './initState';
import { Reducer } from 'react';
import { IDateState, IReduxAction } from '../../types/commonTypes';
import { IDatePayload } from '../actions/dateActions';

const courseReducer: Reducer<IDateState, IReduxAction<IDatePayload>> = (
  state: IDateState = initState.date,
  action: IReduxAction<IDatePayload>
) => {
  switch (action.type) {
    case SELECTED_DATE_UPDATED:
      return { ...state, selectedDate: action.payload.selectedDate };
    default:
      return state;
  }
};

export default courseReducer;
