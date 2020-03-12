import { UPDATE_NOTE_STATUS, NOTE_CONTENT_FETCHED } from './actionTypes';
import {
  updateDailyNote,
  updateWeeklyNote,
  fetchDailyNotes,
  fetchWeeklyNote as fetchWeekly,
  fetchDailyNote
} from '../../services/contentService';

export function setNoteStatus(status) {
  return { type: UPDATE_NOTE_STATUS, status };
}

export function saveDailyNote(data) {
  return dispatch => {
    dispatch(setNoteStatus('loading'));
    return updateDailyNote(data).then(result => {
      dispatch(setNoteStatus('loaded'));
      dispatch(updateNotes(result));
    });
  };
}

export function saveWeeklyNote(data) {
  return dispatch => {
    dispatch(setNoteStatus('loading'));
    return updateWeeklyNote(data).then(result => {
      dispatch(setNoteStatus('loaded'));
      dispatch(updateNotes(result));
    });
  };
}

export function updateNotes(data) {
  return { type: NOTE_CONTENT_FETCHED, data };
}

export function fetchWeeklyNote(date) {
  return dispatch => {
    dispatch(setNoteStatus('loading'));
    return fetchWeekly(date).then(data => {
      dispatch(setNoteStatus('loaded'));
      dispatch(updateNotes(data));
    });
  };
}

export function fetchSingleDailyNote(date) {
  return dispatch => {
    dispatch(setNoteStatus('loading'));
    return fetchDailyNote(date).then(data => {
      dispatch(setNoteStatus('loaded'));
      dispatch(updateNotes(data));
    });
  };
}

export function fetchAllDailyNotes(date) {
  return dispatch => {
    dispatch(setNoteStatus('loading'));
    return fetchDailyNotes(date).then(data => {
      dispatch(setNoteStatus('loaded'));
      dispatch(updateNotes(data));
    });
  };
}
