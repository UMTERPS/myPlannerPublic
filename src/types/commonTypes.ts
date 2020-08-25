import { ThunkAction } from 'react-redux';
import { AnyAction } from 'redux';

export interface ThunkDispatch<S, E, A extends AnyAction> {
  <T extends A>(action: T): T;
  <R>(asyncAction: ThunkAction<R, S, E, A>): R;
}

export interface ISize {
  height: number;
  width: number;
}

export interface IDateNotePayload {
  date: Date;
  value: string;
}

export interface INoteStatus {
  status: string;
}

export interface IDailyData {
  date: Date;
  udid: string;
}

export interface IDateState {
  selectedDate: Date;
}

export interface ISettingsState {
  locale: string;
  theme: string;
}

export interface ISettingsUpdater {
  locale?: string;
  theme?: string;
}

export interface ILayoutState {
  WeeklyNotesPanel?: ISize;
  DailyNotesPanel?: ISize;
  DailyNotesCollection?: ISize;
  DailyNotesHeader?: ISize;
  DailyNote?: ISize;
  DateNavigation?: ISize;
}

export interface INotesState {
  status: string;
}

export interface IReduxAction<T> {
  type: string;
  payload: T;
}
