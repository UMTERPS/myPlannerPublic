let moduleToBeExported = './configureStore.dev';
if (process.env.NODE_ENV === 'production') {
  moduleToBeExported = './configureStore.prod';
}

export default moduleToBeExported;

// export default process.env.NODE_ENV === 'production'
//   ? require('./configureStore.prod')
//   : require('./configureStore.dev');
