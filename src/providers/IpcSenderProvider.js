import { ipcRenderer as ipc } from 'electron';

const updateContent = content => {
  ipc.send('update-content', content);
};

export { updateContent };
