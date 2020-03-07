import { UPDATE_NOTE_STATUS } from './actionTypes';
import {
  updateContent as update,
  fetchContent as fetch
} from '../../services/contentService';

export function updateNoteStatus(status) {
  return { type: UPDATE_NOTE_STATUS, status };
}

export function updateContent(content) {
  return dispatch => {
    dispatch(updateNoteStatus('loading'));
    return update(content).then(() => {
      fetch('dummyKey').then(data => {
        console.log(data);
        dispatch(updateNoteStatus('loaded'));
      });
    });
  };
}

// todo: add fetching key in parameter
export async function fetchContent(key) {
  return dispatch => {
    dispatch(updateNoteStatus('loading'));
    return fetch(key).then(data => {
      console.log(data);
      dispatch(updateNoteStatus('loaded'));
    });
  };
}
