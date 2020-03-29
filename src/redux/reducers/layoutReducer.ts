import { LAYOUT_UPDATED } from '../actions/actionTypes';
import { initState } from './initState';
import { Reducer } from 'react';
import { ILayoutState, IReduxAction } from '../../types/commonTypes';
import { ILayoutPayload } from '../actions/layoutActions';

const layoutReducer: Reducer<ILayoutState, IReduxAction<ILayoutPayload>> = (
  state: ILayoutState = initState.layout,
  action: IReduxAction<ILayoutPayload>
) => {
  switch (action.type) {
    case LAYOUT_UPDATED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default layoutReducer;
