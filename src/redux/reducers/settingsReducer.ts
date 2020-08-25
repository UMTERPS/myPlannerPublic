import { UPDATE_LOCALE, UPDATE_THEME } from '../actions/actionTypes';
import { ISettingsState } from '../../types/commonTypes';
import { ILocalePayload } from '../actions/settingsActions';
import { initState } from './initState';
import { Reducer } from 'react';
import { IReduxAction } from '../../types/commonTypes';

const localeReducer: Reducer<ISettingsState, IReduxAction<ILocalePayload>> = (
  state: ISettingsState = initState.settings,
  action: IReduxAction<ILocalePayload>
) => {
  switch (action.type) {
    case UPDATE_LOCALE:
      return { ...state, ...action.payload };
    case UPDATE_THEME:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default localeReducer;
