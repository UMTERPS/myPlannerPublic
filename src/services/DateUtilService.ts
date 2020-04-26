import IdPrefix from '../../constants/IdConstants';
import { IDailyData } from '../types/commonTypes';

const getDailyData = (date: Date): [IDailyData] => {
  const week = new Array() as [IDailyData];
  // Starting with Monday not Sunday
  const _date = getMondayOfWeek(date);
  for (var i = 0; i < 7; i++) {
    const udid = generateUdid(_date);
    week.push({ date: new Date(_date), udid });
    _date.setDate(_date.getDate() + 1);
  }
  return week;
};

const generateUdidsByDate = (date: Date): [string] => {
  const udids = new Array() as [string];
  // Starting with Monday not Sunday
  const _date = getMondayOfWeek(date);
  for (var i = 0; i < 7; i++) {
    const udid = generateUdid(_date);
    udids.push(udid);
    _date.setDate(_date.getDate() + 1);
  }
  return udids;
};

const generateUdid = (date: Date): string => {
  return IdPrefix.UDID_PREFIX + _generateId(date);
};

const generateUwid = (date: Date): string => {
  return IdPrefix.UWID_PREFIX + _generateId(date);
};

const _generateId = (date: Date): string => {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('');
};

const getMondayOfWeek = (date: Date): Date => {
  const _date = new Date(date);
  _date.setDate(date.getDate() - (date.getDay() === 0 ? 7 : 0) + 1); // offset for Sunday
  return _date;
};

export {
  getDailyData,
  getMondayOfWeek,
  generateUdidsByDate,
  generateUdid,
  generateUwid
};
