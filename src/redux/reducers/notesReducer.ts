import { UPDATE_NOTE_STATUS } from '../actions/actionTypes';
import { initState } from './initState';
import { IDateState, IReduxAction } from '../../types/commonTypes';
import { Reducer } from 'react';
// import { IDateNotePayload } from '../actions/notesActions';

const notesReducer: Reducer<IDateState, IReduxAction<any>> = (
  state = initState.notes,
  action
) => {
  switch (action.type) {
    case UPDATE_NOTE_STATUS:
      return { ...state, status: action.payload.status };
    default:
      return state;
  }
};

export default notesReducer;
