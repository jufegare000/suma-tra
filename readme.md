_if running in windows_
```javascript
"scripts": {
    "start": "tsc && node ./dist/app.js",
    "debug": "set DEBUG=app && npm run start",
    "test": "npm test"
  },
```
  _if running in linux_
```javascript
"scripts": {
"start": "tsc && node ./dist/app.js",
"debug": "export DEBUG=app && npm run start",
"test": "npm test"
},
```
