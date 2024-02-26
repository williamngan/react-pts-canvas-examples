# pts-react-example

This repo provides an example of using [react-pts-canvas](https://github.com/williamngan/react-pts-canvas) with [Vite](https://vitejs.dev/). The example code will also work with [create-react-app](https://create-react-app.dev/) if you prefer it over Vite.

please refer to documentations in [`react-pts-canvas`](https://github.com/williamngan/react-pts-canvas) repo for details.

[Pts](https://github.com/williamngan/pts) is a typescript/javascript library for visualization and creative-coding. Get started at [ptsjs.org](https://ptsjs.org).

Let's take a look at [the demo](https://williamngan.github.io/react-pts-canvas-examples/build/) first before we start.

![screenshot](./screenshot.png)


## Quick Start
If you just want to try out Pts, there's no need to install and build. Try out the [online demo editor](https://ptsjs.org/demo/edit/?name=polygon.convexHull) for quick experimentations.


## Technical notes

For common use cases, you can include `PtsCanvas` functional component in your own component. Take a look at `PtsExamples.jsx` for example components.

```javascript
import { PtsCanvas } from "react-pts-canvas";
```

Legacy class component is deprecated in react-pts-canvas v0.4. If you still need it, use v0.3.x and take a look at the code in `legacy` folder. 

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
