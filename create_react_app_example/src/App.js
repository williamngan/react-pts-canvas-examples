import React, { Component } from 'react';
import {QuickStartCanvas} from "react-pts-canvas";
import {ChartExample, AnimationExample, SoundExample} from './PtsExamples';
import {Util, Line} from 'pts';
import './App.css';
import './highlight-github.css';
import Highlight from 'react-highlight'

export default class App extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      variance: 0.2,
      pauseAnimation: false
    }

    this.mockData( 0.2 );

  }

  mockData( variance ) {
    let gaussian = (x) => {
      let mean = 0;
      return (1 / Math.sqrt( 2 * Math.PI * variance ) ) * Math.exp( -(x-mean)*(x-mean)/(2*variance) );
    };

    this.chartData = [];
    for (let i=-5; i<5; i+=0.1) {
      this.chartData.push( gaussian(i) );
    }
  }

  handleChange(event) {
    this.setState({variance: event.target.value});
  }

  handleClick(event) {
    this.setState({pauseAnimation: !this.state.pauseAnimation});
  }

  componentWillUpdate(nextProps, nextState) {
    this.mockData( nextState.variance );
  }

  render() {
    return (
      
      <div className="App" style={{textAlign: "left"}}>
        <a id="repo" href="https://github.com/williamngan/pts-react-example">Github</a>
        <div className="top">
          <h1>Pts + React</h1>
          
          <h2>
            <a href="https://ptsjs.org" target="pts">Pts</a> is a library for visualization and creative-coding. 
            You can use it in <a href="https://www.npmjs.com/package/react-pts-canvas">React component</a> to create canvas animations and other fun things.
            Here are a few examples to help you get started.
          </h2>

        </div>
      
        <div className="row">
          <div><QuickStartCanvas onAnimate={(space, form, time) => {
            let subs = space.innerBound.map( p => Line.subpoints( [p, space.pointer], 30 ) );
            form.strokeOnly("#FDC", 2).rects( Util.zip( subs ) );
          }} /></div>
          <div>
            <h3>QuickStartCanvas</h3>
            <p><a href="https://www.npmjs.com/package/react-pts-canvas">QuickStartCanvas</a> is a basic implementation of <a href="https://ptsjs.org">Pts</a> in a React component. Install it via <code>npm install react-pts-canvas</code>.</p>
            <p>Create canvas drawings using its callback function props <code>onAnimate</code>, <code>onStart</code>, <code>onAction</code>, and <code>onResize</code>. 
            (<a href="https://github.com/williamngan/react-pts-canvas/blob/master/README.md#quickstartcanvas-component">Docs</a>)</p>
            <Highlight className="xml">{`
<QuickStartCanvas onAnimate={ (space, form, time) => {
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
          <div><AnimationExample name="pts_anim" background="#fe3" pause={this.state.pauseAnimation} /></div>
          <div>
            <h3>AnimationExample with PtsCanvas</h3>
            <p><a href="https://github.com/williamngan/react-pts-canvas/blob/master/README.md#ptscanvas">PtsCanvas</a> is a base component which you can extend to make it your own. This example component renders a continuous noise pattern.</p>
            <p>Hover over the canvas to change the animation, and toggle Play/Pause by clicking this button: </p>
            <p><button onClick={this.handleClick.bind(this)}>{this.state.pauseAnimation ? "Play" : "Pause"}</button></p>
            <Highlight className="xml">
{`<AnimationExample 
    name="pts_anim"
    background="#fe3"
    pause={this.state.pauseAnimation} 
/>`}
            </Highlight>
            <p>AnimationExample extends PtsCanvas and overrides the <code>animate</code> function to implement a custom animation. It only takes a couple lines of code!</p>
            <p><a href="https://github.com/williamngan/pts-react-example/blob/master/create_react_app_example/src/PtsExamples.jsx#L60">Source Code</a></p>
          </div>
        </div>

        <div className="row">
          <div><ChartExample name="pts_chart" background="#0c9" play={false} data={this.chartData} variance={this.state.variance} /></div>
          <div>
            <h3>ChartExample with PtsCanvas</h3>
            <p>You can also use Pts to build a custom visualization component. The following example draws a bell curve on canvas. Change the variance property to update the visualization:</p>
            <p><label>Variance: <input type="range" value={this.state.variance} min={0.05} max={5} step={0.05} onChange={this.handleChange.bind(this)} /></label> ({this.state.variance})</p>
            <Highlight className="xml">
{`<ChartExample 
    name="pts_chart" 
    background="#0c9" play={false} 
    data={this.chartData} 
    variance={this.state.variance} 
/>`}
            </Highlight>
            <p><a href="https://github.com/williamngan/pts-react-example/blob/master/create_react_app_example/src/PtsExamples.jsx#L116">Source Code</a></p>
          </div>
        </div>

        <div className="row">
          <div><SoundExample name="pts_sound" background="#0cf" file="spacetravel.mp3" credit="Music: Space Travel Cliché by MrGreenH" play={true} /></div>
          <div>
            <h3>SoundExample with PtsCanvas</h3>
            <p>And how about making a fun sound visualization? Here's an example. Look at the source code to see how simple it is!</p>
            <Highlight className="xml">
{`<SoundExample 
    name="pts_sound" 
    background="#0cf" 
    file="spacetravel.mp3"
    credit="Music: Space Travel Cliché by MrGreenH"
    play={true}
/>`}
            </Highlight>
            <p><a href="https://github.com/williamngan/pts-react-example/blob/master/create_react_app_example/src/PtsExamples.jsx#L9">Source Code</a></p>
          </div>
        </div>
        
      </div>
    );
  }
}