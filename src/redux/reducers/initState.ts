import { ISettingsState } from './../../types/commonTypes';
import { IDateState, ILayoutState, INotesState } from '../../types/commonTypes';

interface IMyPlannerInitialState {
  date: IDateState;
  layout: ILayoutState;
  notes: INotesState;
  settings: ISettingsState;
}

const initState: IMyPlannerInitialState = {
  date: {
    selectedDate: new Date()
  },
  layout: {},
  notes: {
    status: 'loaded'
  },
  settings: {
    locale: '',
    theme: ''
  }
};

export { initState, IMyPlannerInitialState };
