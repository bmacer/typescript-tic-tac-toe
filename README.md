Typescript Tic-Tac-Toe demo

It's already built in Javascript, so you don't need to use Typescript at all to see it work.

But if you want to make changes, make sure Typescript is installed.

`npm install -g typescript` (might require sudo)

Build the node modules with `npm install`

Then you work in `src/index.ts`, and use `tsc` to build to `dist/index.js`.

Hint: use `tsc -w` to watch for changes and auto-build.

Then in another terminal, launch lite-server (part of the package) with `npm start`.  This will also auto-reload.