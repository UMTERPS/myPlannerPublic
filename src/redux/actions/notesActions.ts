import { UPDATE_NOTE_STATUS } from './actionTypes';
import {
  updateDailyNote,
  updateWeeklyNote,
  fetchWeeklyNote as fetchWeekly,
  fetchDailyNote
} from '../../services/NotesService';
import {
  IReduxAction,
  ThunkDispatch,
  IDateNotePayload,
  INoteStatus
} from '../../types/commonTypes';
import { ActionCreator, Action } from 'redux';

export const setNoteStatus: ActionCreator<IReduxAction<INoteStatus>> = (
  status: INoteStatus
) => {
  return { type: UPDATE_NOTE_STATUS, payload: { ...status } };
};

export const saveDailyNote = (data: IDateNotePayload) => {
  return (dispatch: ThunkDispatch<{}, undefined, Action>) => {
    dispatch(setNoteStatus({ status: 'loading' }));
    return updateDailyNote(data).then(() => {
      dispatch(setNoteStatus({ status: 'loaded' }));
    });
  };
};

export const saveWeeklyNote = (data: IDateNotePayload) => {
  return (dispatch: ThunkDispatch<{}, undefined, Action>) => {
    dispatch(setNoteStatus({ status: 'loading' }));
    return updateWeeklyNote(data).then(() => {
      dispatch(setNoteStatus({ status: 'loaded' }));
    });
  };
};

export const fetchWeeklyNote = (date: IDateNotePayload) => {
  return (dispatch: ThunkDispatch<{}, undefined, Action>) => {
    dispatch(setNoteStatus({ status: 'loading' }));
    return fetchWeekly(date).then(data => {
      dispatch(setNoteStatus({ status: 'loaded' }));
      return data;
    });
  };
};

export const fetchSingleDailyNote = (date: IDateNotePayload) => {
  return (dispatch: ThunkDispatch<{}, undefined, Action>) => {
    dispatch(setNoteStatus('loading'));
    return fetchDailyNote(date).then(data => {
      dispatch(setNoteStatus({ status: 'loaded' }));
      return data;
    });
  };
};
