import { SELECTED_DATE_UPDATED } from './actionTypes';
import { IReduxAction } from '../../types/commonTypes';
import { ActionCreator } from 'redux';
// ActionCreator<IReduxAction<ITableStatePayload>>

export interface IDatePayload {
  selectedDate: Date;
}
export const updateSelectedDate: ActionCreator<IReduxAction<IDatePayload>> = (
  selectedDate: Date
) => {
  return { type: SELECTED_DATE_UPDATED, payload: { selectedDate } };
};
