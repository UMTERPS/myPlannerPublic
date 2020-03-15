import * as ipcProvider from '../providers/IpcRendererProvider';
import {
  generateUwid,
  generateUdid,
  generateUdidsByDate,
  getMondayOfWeek
} from './DateUtilService';

const updateDailyNote = data => {
  const _key = generateUdid(data.date);
  return ipcProvider.updateContent(_key, data.value);
};

const updateWeeklyNote = data => {
  const _key = generateUwid(getMondayOfWeek(data.date));
  return ipcProvider.updateContent(_key, data.value);
};

const fetchWeeklyNote = date => {
  const _uwid = generateUwid(getMondayOfWeek(date));
  return ipcProvider.fetchContentByUdids(_uwid).then(data => {
    return data[_uwid];
  });
};

const fetchDailyNote = date => {
  const udid = generateUdid(date);
  return ipcProvider.fetchContentByUdids(udid).then(data => {
    return data[udid];
  });
};

const fetchDailyNotes = date => {
  const udids = generateUdidsByDate(date);
  return ipcProvider.fetchContentByUdids(udids);
};

export {
  updateDailyNote,
  updateWeeklyNote,
  fetchWeeklyNote,
  fetchDailyNote,
  fetchDailyNotes
};
