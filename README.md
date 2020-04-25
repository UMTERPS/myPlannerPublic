# MyPlanner

A simple planner where you could log or plan your daily work. It is a completely offline app, which means it doesn't require an Internet connection to run and you may not be able to sync your data between your devices.

## Supported Platforms

MyPlanner is known to run on the following **host** platforms:

- Windows (32/64 bit)
- macOS (formerly known as OS X)
- Linux (x86/x86_64) (Not yet supported)

## How to run

This module requires Node.js 10.0 or higher to run.

```sh
# Install dependencies
npm install

# For first time running
npm run bootstrap

# For routine development, run the following command simultaneously
npm run build:ui
npm run start:electron

# Whenever there is a locale related change, run
npm run build:locale

# For bundle project into final package
npm run deploy
```
