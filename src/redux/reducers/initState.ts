import { IDateState, ILayoutState, notesState } from '../../types/commonTypes';

interface IMyPlannerInitialState {
  date: IDateState;
  layout: ILayoutState;
  notes: notesState;
}

const initState: IMyPlannerInitialState = {
  date: {
    selectedDate: new Date()
  },
  layout: {},
  notes: {
    status: 'loaded'
  }
};

export { initState, IMyPlannerInitialState };
