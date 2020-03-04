import { ipcRenderer as ipc } from 'electron';

const registerListeners = () => {
  ipc.on('content-updated', (event, data) => {
    console.log('content-updated');
    console.log(data);
  });
};

export { registerListeners };
