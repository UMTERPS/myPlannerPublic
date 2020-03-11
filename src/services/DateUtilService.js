import IdPrefix from '../../constants/IdConstants';

const getDailyData = date => {
  const week = new Array();
  // Starting with Monday not Sunday
  const _date = getMondayOfWeek(date);
  for (var i = 0; i < 7; i++) {
    const udid = generateUdid(_date);
    week.push({ date: new Date(_date), udid });
    _date.setDate(_date.getDate() + 1);
  }
  return week;
};

const generateUdidsByDate = date => {
  const udids = new Array();
  // Starting with Monday not Sunday
  const _date = getMondayOfWeek(date);
  for (var i = 0; i < 7; i++) {
    const udid = generateUdid(_date);
    udids.push(udid);
    _date.setDate(_date.getDate() + 1);
  }
  return udids;
};

const generateUdid = date => {
  return IdPrefix.UDID_PREFIX + _generateId(date);
};

const generateUwid = date => {
  return IdPrefix.UWID_PREFIX + _generateId(date);
};

const _generateId = date => {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('');
};

const getMondayOfWeek = date => {
  const _date = new Date(date);
  _date.setDate(date.getDate() - date.getDay() + 1);
  return _date;
};

export {
  getDailyData,
  getMondayOfWeek,
  generateUdidsByDate,
  generateUdid,
  generateUwid
};
