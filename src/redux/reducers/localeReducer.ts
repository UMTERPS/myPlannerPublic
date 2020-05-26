import { UPDATE_LOCALE } from './../actions/actionTypes';
import { ILocaleState } from './../../types/commonTypes';
import { ILocalePayload } from './../actions/localeActions';
import { initState } from './initState';
import { Reducer } from 'react';
import { IReduxAction } from '../../types/commonTypes';

const localeReducer: Reducer<ILocaleState, IReduxAction<ILocalePayload>> = (
  state: ILocaleState = initState.locale,
  action: IReduxAction<ILocalePayload>
) => {
  switch (action.type) {
    case UPDATE_LOCALE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default localeReducer;
