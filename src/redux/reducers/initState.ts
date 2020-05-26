import { ILocaleState } from './../../types/commonTypes';
import { IDateState, ILayoutState, INotesState } from '../../types/commonTypes';

interface IMyPlannerInitialState {
  date: IDateState;
  layout: ILayoutState;
  notes: INotesState;
  locale: ILocaleState;
}

const initState: IMyPlannerInitialState = {
  date: {
    selectedDate: new Date()
  },
  layout: {},
  notes: {
    status: 'loaded'
  },
  locale: {
    locale: ''
  }
};

export { initState, IMyPlannerInitialState };
