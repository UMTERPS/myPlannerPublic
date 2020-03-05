import { ipcRenderer as ipc } from 'electron';
import ipcConstants from '../../constants/IPCContants';

const updateContent = content => {
  ipc.send(ipcConstants.UPDATE_CONTENT, content);
  return new Promise((resolve, reject) => {
    ipc.once(`${ipcConstants.UPDATE_CONTENT}_SUCCESS`, (event, response) => {
      return resolve(response);
    });
    ipc.once(`${ipcConstants.UPDATE_CONTENT}_FAILED`, (event, response) => {
      return reject(response);
    });
  });
};

const fetchContent = key => {
  ipc.send(ipcConstants.FETCH_CONTENT, key);
  return new Promise((resolve, reject) => {
    ipc.once(`${ipcConstants.FETCH_CONTENT}_SUCCESS`, (event, response) => {
      resolve(response);
    });
    ipc.once(`${ipcConstants.FETCH_CONTENT}_FAILED`, (event, response) => {
      reject(response);
    });
  });
};

export { updateContent, fetchContent };
