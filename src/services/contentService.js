import * as ipcProvider from '../providers/IpcSenderProvider';
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
  return ipcProvider.fetchContentByUdids(generateUwid(getMondayOfWeek(date)));
};

const fetchDailyNote = date => {
  const udid = generateUdid(date);
  return ipcProvider.fetchContentByUdids(udid);
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
