# Using Pts with neutrino

[Pts](https://github.com/williamngan/pts) is a typescript/javascript library for visualization and creative-coding. Get started at [ptsjs.org](https://ptsjs.org).

This project provides examples of using Pts in [React](https://github.com/facebook/react) components. It's built with Mozilla's [neutrino.js](https://neutrinojs.org). Neutrino is a companion tool which combines webpack with good presets. It's fairly simple to customize your own project using it.

Also review the README in the [main repo folder](../) for other build options.

---

## Usage

1. Download or clone this repo and run `npm install`. Once installed, run `npm start` to test in localhost, and `npm run build` to make a build.
2. Quick start by extending the base [`PtsCanvas`](https://github.com/williamngan/pts-react-example/blob/master/src/PtsCanvas.jsx) to create your custom component. See components in [`PtsExamples`](https://github.com/williamngan/pts-react-example/blob/master/src/PtsExamples.jsx) that use this approach.

---

## Create your own

To start with a neutrino project from scratch, try these steps:
 
1. Install neutrino and a middleware such as `@neutrinojs/react`.
    ```bash
    npm install --save-dev neutrino @neutrinojs/react
    ```
2. Create a new project and customize your build.
    ```bash
    npx @neutrinojs/create-project <directory-name>
    cd <directory-name>
    ```
3. Install Pts and you are ready to go.
    ```bash
    npm install pts
    ```

Take a look at [the instructions](https://neutrinojs.org/installation/) on neutrino.js' website for details.
