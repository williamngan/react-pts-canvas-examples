# pts-react-example

This repo provides an example of using Pts in React via [`react-pts-canvas`](https://www.npmjs.com/package/react-pts-canvas).

[Pts](https://github.com/williamngan/pts) is a typescript/javascript library for visualization and creative-coding. Get started at [ptsjs.org](https://ptsjs.org).

Let's take a look at [the demo](https://williamngan.github.io/react-pts-canvas-examples/build/) first before we start.

![screenshot](./screenshot.png)



## Using Pts with create-react-app
[`create-react-app`](https://create-react-app.dev/) is a popular tool by Facebook to bootstrap a React application. 

To get started, take a look at the README in [example](example) folder.



## Quick Start
If you just want to try out Pts, there's no need to install and build. Try out the [online demo editor](https://ptsjs.org/demo/edit/?name=polygon.convexHull) for quick experimentations.



## Technical notes

For common use cases, you can include `PtsCanvas` functional component in your own component. Take a look at `PtsExamples.jsx` for example components.

```javascript
import { PtsCanvas } from "react-pts-canvas";
```

If needed, you can also use the legacy class component by extending `PtsCanvasLegacy`.

For documentations, please refer to [`react-pts-canvas`](https://github.com/williamngan/react-pts-canvas) repo.


If you need to use Pts, you can import a class like this:

```javascript
import {Pt, Create, Util} from "pts"; // use ES6
```

Note that Pts is an javascript es6 library that targets modern browsers. It also provides an ES5 version for use in older builds. To use ES5, import a class like this:

```javascript
import {Pt} from "pts/dist/es5"; // use ES5
```



## License
Apache License 2.0. See LICENSE file for details.
Copyright © 2017-2018 by William Ngan and contributors.
