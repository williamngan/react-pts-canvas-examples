# Using Pts with create-react-app

[Pts](https://github.com/williamngan/pts) is a typescript/javascript library for visualization and creative-coding. Get started at [ptsjs.org](https://ptsjs.org).

This project provides examples of using Pts in [React](https://github.com/facebook/react) components. It's built with Facebook's popular [create-react-app](https://neutrinojs.org) tool.

Also review the README in the [main repo folder](https://github.com/williamngan/pts-react-example/) for other build options.

---

## Usage

1. Download or clone this repo and run `yarn install`. Once installed, run `yarn start` to test in localhost, and `yarn build` to make a build.
2. Quick start by extending the base [`PtsCanvas`](https://github.com/williamngan/pts-react-example/blob/master/src/PtsCanvas.jsx) to create your custom component. See components in [`PtsExamples`](https://github.com/williamngan/pts-react-example/blob/master/src/PtsExamples.jsx) that use this approach.
3. Note that since `create-react-app` builds in ES5, we should import the ES5 version of Pts like this:
    ```javascript
    import {Pt} from 'pts/dist/es5'; // use ES5
    ```
    The next version of create-react-app may support ES6 build directly.

---

## Create your own

To start with a neutrino project from scratch, try these steps:
 
1. Install create-react-app
    ```bash
    npm install -g create-react-app
    ```
2. Create a new project and customize your build.
    ```bash
    npx create-react-app my-app
    cd my-app
    ```
3. Install Pts and you are ready to go.
    ```bash
    yarn add pts
    ```

Take a look at [create-react-app repo](https://github.com/facebook/create-react-app) for additional details.
