import { LAYOUT_UPDATED } from './actionTypes';
import { IReduxAction, ISize } from '../../types/commonTypes';
import { ActionCreator } from 'redux';

export interface ILayoutPayload {
  WeeklyNotesPanel?: ISize;
  DailyNotesPanel?: ISize;
  DailyNotesCollection?: ISize;
  DailyNotesHeader?: ISize;
  DailyNote?: ISize;
  DateNavigation?: ISize;
}

export const updateLayout: ActionCreator<IReduxAction<ILayoutPayload>> = (
  layout: ILayoutPayload
) => {
  return { type: LAYOUT_UPDATED, payload: { ...layout } };
};
