if running in windows

"scripts": {
    "start": "tsc && node ./dist/app.js",
    "debug": "set DEBUG=app && npm run start",
    "test": "npm test"
  },

  if running in linux

"scripts": {
    "start": "tsc && node ./dist/app.js",
    "debug": "export DEBUG=app && npm run start",
    "test": "npm test"
  },