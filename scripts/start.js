const run = require('parallel-webpack').run;
const renderConfig = require.resolve('../webpack.config.renderer.dev.js');
const mainConfig = require.resolve('../webpack.config.main.dev.js');
const child = require('child_process');

run(
  renderConfig,
  {
    watch: true
  },
  async () => {
    // webpack build application.ts
    console.log('building application...');
    await run(mainConfig);

    // bootstrap electron application
    // child.execSync will hang the current process
    console.log('running application...');
    child.execSync('npx electron ./app.js');

    // exit entire process if application is shuwtdown
    console.log('application shutting down...');
    process.exit(0);
  }
);
