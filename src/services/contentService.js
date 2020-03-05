import * as ipcProvider from '../providers/IpcSenderProvider';

const updateContent = content => {
  return ipcProvider.updateContent(content);
};

const fetchContent = key => {
  return ipcProvider.fetchContent(key);
};

export { updateContent, fetchContent };
