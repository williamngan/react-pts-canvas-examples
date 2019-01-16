# pts-react-example

[Pts](https://github.com/williamngan/pts) is a typescript/javascript library for visualization and creative-coding. Get started at [ptsjs.org](https://ptsjs.org).

This repo provides two examples of using Pts in React components: 
1. with `create-react-app` 
2. with `neutrino.js`.

Let's take a look at [the demo](https://williamngan.github.io/pts-react-example/build/) first before we start.

![screenshot](./screenshot.png)



## Using Pts with create-react-app
[`create-react-app`](https://github.com/facebook/create-react-app) is a popular tool by Facebook to bootstrap a React application. 

To get started, take a look at the README in [create_react_app_example](create_react_app_example) folder.



## Quick Start
If you just want to try out Pts, there's no need to install and build. Try out the [online demo editor](https://ptsjs.org/demo/edit/?name=polygon.convexHull) for quick experimentations.



## Technical notes

For common use cases, you can extend `PtsCanvas` and use it in your React app.

```javascript
import PtsCanvas from "react-pts-canvas";
```

If you need to use Pts in some other ways, you can import a class like this:

```javascript
import {Pt} from "pts"; // use ES6
```

Note that Pts is an javascript es6 library that targets modern browsers. It also provides an ES5 version for use in older builds. To use ES5, import a class like this:

```javascript
import {Pt} from "pts/dist/es5"; // use ES5
```



## License
Apache License 2.0. See LICENSE file for details.
Copyright © 2017-2018 by William Ngan and contributors.