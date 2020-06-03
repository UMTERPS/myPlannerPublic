# MyPlanner

A simple planner where you could log or plan your daily work. It is a completely offline app, which means it doesn't require an Internet connection to run and you may not be able to sync your data between your devices.

## Supported Platforms

MyPlanner is known to run on the following host platforms:

- Windows (32/64 bit)
- macOS (formerly known as OS X)
- Linux (x86/x86_64)

## Key components and libraries

1. Electron. Fundation of the project, which is a basic chromium browser which runs locally on the client.
2. React (and its closely realted libraries). Another fundamental library, which is the backbone of the entire UI part.
3. CKEditor5. To support rich text input
4. Ant Design (antd). UI library. Will try to eventually replace any other UI libraries in this projects with Ant Design.
5. i18next. For i18n support.
6. lowdb. A simple local file-based database, which stores data in json format.

## How to run

This module requires Node.js 10.0 or higher to run.

```bash
# 1. Install dependencies
npm install

# 2. Build CKEditor
npm run build:ckeditor

# 3. Whenever there is a locale related change, run
# This command needs to be re-run if there is an update in the locale files
npm run build:locale

# 4. For routine development, run the following command simultaneously
npm run build:ui
npm run start:electron

# For bundle project into final package
npm run deploy
```
