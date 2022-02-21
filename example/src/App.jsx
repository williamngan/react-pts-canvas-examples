import React, { useState } from "react";
import { AnimationExample, ChartExample } from "./PtsExamples";
import "./App.css";
import "./highlight-github.css";
import Highlight from "react-highlight";
import { PtsCanvas } from "react-pts-canvas";
import {Line, Util} from 'pts';

export default function App(props) {
  const [variance, setVariance] = useState(0.2);
  const [pause, setPause] = useState(false);

  return (
    <div className="App" style={{ textAlign: "left" }}>
      <a id="repo" href="https://github.com/williamngan/pts-react-example">
        Github
      </a>
      <div className="top">
        <h1>Pts + React</h1>

        <h2>
          <a href="https://ptsjs.org" target="pts">
            Pts
          </a>{" "}
          is a library for visualization and creative-coding. You can use it in{" "}
          <a href="https://www.npmjs.com/package/react-pts-canvas">
            React component
          </a>{" "}
          to create canvas animations and other fun things. Here are a few
          examples to help you get started.
        </h2>
      </div>

      <div className="row">
          <div><PtsCanvas onAnimate={(space, form, time) => {
            let subs = space.innerBound.map( p => Line.subpoints( [p, space.pointer], 30 ) );
            form.strokeOnly("#FDC", 2).rects( Util.zip( subs ) );
          }} /></div>
          <div>
            <h3>PtsCanvas</h3>
            <p><a href="https://www.npmjs.com/package/react-pts-canvas">PtsCanvas</a> is an implementation of <a href="https://ptsjs.org">Pts</a> in a React functional component. Install it via <code>npm install react-pts-canvas</code>.</p>
            <p>Create canvas drawings using its callback function props <code>onAnimate</code>, <code>onStart</code>, <code>onAction</code>, and <code>onResize</code>. 
            (<a href="https://github.com/williamngan/react-pts-canvas/blob/master/README.md">Docs</a>)</p>
            <Highlight className="xml">{`
<PtsCanvas onAnimate={ (space, form, time) => {
  let subs = space.innerBound.map( 
    p => Line.subpoints( [p, space.pointer], 30 ) 
  );
  form.strokeOnly("#FDC", 2).rects( Util.zip( subs ) );
}} />
            `}</Highlight>
            <p>Default properties: </p>
            <Highlight className="js">
{`{
  name: "pts-react",
  background: "#9ab",
  resize: true,
  retina: true,
  play: true
}`}          
          </Highlight>
          <p><a href="https://github.com/williamngan/react-pts-canvas" target="react_pts_canvas_repo">See react-pts-canvas repo</a></p>
          </div>
        </div>

      <div className="row">
        <div>
          <AnimationExample
            name="pts_anim"
            background="#fe3"
            play={!pause}
          />
        </div>
        <div>
          <h3>AnimationExample with PtsCanvas</h3>
          <p>
            <a href="https://github.com/williamngan/react-pts-canvas/blob/master/README.md#ptscanvas">
              PtsCanvas
            </a>{" "}
            is a functional component which you include in another component to make it your own. This
            example component renders a continuous noise pattern.
          </p>
          <p>
            Hover over the canvas to change the animation, and toggle Play/Pause
            by clicking this button:{" "}
          </p>
          <p><button onClick={(e) => {setPause(!pause)}}>{pause ? "Play" : "Pause"}</button></p>
          <p>

          </p>
          <Highlight className="xml">
            {`<AnimationExample 
    name="pts_anim"
    background="#fe3"
    play={!pause}
/>`}
          </Highlight>
          <p>
            AnimationExample extends PtsCanvas and overrides the{" "}
            <code>animate</code> function to implement a custom animation. It
            only takes a couple lines of code!
          </p>
          <p>
            <a href="https://github.com/williamngan/pts-react-example/blob/master/example/src/PtsExamples.jsx#L60">
              Source Code
            </a>
          </p>
        </div>
      </div>

      <div className="row">
        <div>
          <ChartExample
            name="pts_chart"
            background="#0c9"
            variance={variance}
          />
        </div>
        <div>
          <h3>ChartExample with PtsCanvas</h3>
          <p>
            You can also use Pts to build a custom visualization component. The
            following example draws a bell curve on canvas. Change the variance
            property to update the visualization:
          </p>
          <p>
            <label>
              Variance:{" "}
              <input
                type="range"
                value={variance}
                min={0.05}
                max={5}
                step={0.05}
                onChange={(evt) => {
                  setVariance(evt.target.value);
                }}
              />
            </label>{" "}
            ({variance})
          </p>
          <Highlight className="xml">
            {`<ChartExample 
    name="pts_chart" 
    background="#0c9"
    variance={variance}
/>`}
          </Highlight>
          <p>
            <a href="https://github.com/williamngan/pts-react-example/blob/master/example/src/PtsExamples.jsx#L116">
              Source Code
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
