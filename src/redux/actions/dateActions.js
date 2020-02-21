import { SELECTED_DATE_UPDATED } from './actionTypes';

export function updateSelectedDate(selectedDate) {
  return { type: SELECTED_DATE_UPDATED, selectedDate };
}
