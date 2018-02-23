# magicxer [![npm](https://img.shields.io/npm/v/magicxer.svg)](https://www.npmjs.com/package/magicxer)
[![npm](https://img.shields.io/npm/dt/magicxer.svg)](https://www.npmjs.com/package/magicxer)
 [![npm](https://img.shields.io/npm/l/magicxer.svg)](https://www.npmjs.com/package/magicxer)

Magical words mixer. Combines words from list into a list of clever mixes. You can check it out live at [magicxer.smutnyleszek.com](http://magicxer.smutnyleszek.com).

## Usage

```sh
npm install magicxer --save
```

```js
const magicxer = require("magicxer").magicxer;
magicxer.mix("snow", "white");
```

```typescript
import { magicxer } from "magicxer";
magicxer.mix("snow", "white");
```

## Technicalities

This is a small webapp project that I created to check out some fancy new tech:

* Parcel
* Vue.js
* Jest
* TypeScript
* Prettier
* 2 spaces indentation :-D
* .editorconfig

## Development

You probably want to watch tests: `npm run test-watch`.

### Website

Change code at `src` and run Parceljs live server ([localhost:2038](http://localhost:2038)): `npm start`.

### Module

Change code at `lib` or `src`, run `npm run build-module` and use your local version in your other npm project.

## Building

Development website outcome is in `dev`, production website is in `docs`[^1] and module code is in `dist`.

Before commiting the changes, make sure to run `npm run build-docs` or `npm run build-module` - depending on what part of the project you've worked on.

[^1]: We use `docs` directory, because Github Pages allows to serve only root or `docs`.
