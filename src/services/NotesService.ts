import * as ipcProvider from '../providers/IpcRendererProvider';
import {
  generateUwid,
  generateUdid,
  generateUdidsByDate,
  getMondayOfWeek
} from './DateUtilService';
import { IDateNotePayload } from '../types/commonTypes';

const updateDailyNote = (data: IDateNotePayload): Promise<void> => {
  const _key = generateUdid(data.date);
  return ipcProvider.updateContent(_key, data.value);
};

const updateWeeklyNote = (data: IDateNotePayload): Promise<void> => {
  const _key = generateUwid(getMondayOfWeek(data.date));
  return ipcProvider.updateContent(_key, data.value);
};

const fetchWeeklyNote = (date: Date): Promise<string> => {
  const _uwid = generateUwid(getMondayOfWeek(date));
  return ipcProvider.fetchContentByUdids(_uwid).then(data => {
    return data[_uwid];
  });
};

const fetchDailyNote = (date: Date): Promise<string> => {
  const udid = generateUdid(date);
  return ipcProvider.fetchContentByUdids(udid).then(data => {
    return data[udid];
  });
};

export { updateDailyNote, updateWeeklyNote, fetchWeeklyNote, fetchDailyNote };
