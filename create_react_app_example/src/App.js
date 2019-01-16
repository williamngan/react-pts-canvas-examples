import React, { Component } from 'react';
import PtsCanvas from "react-pts-canvas";
import {ChartExample, AnimationExample} from './PtsExamples';
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
            You can incorporate it into React to create canvas animations and other fun things.
            Here are a few examples to help you get started.
          </h2>

          <p>Note that Pts is an ES6 library, and for production (minified) build you'll need to set up custom build steps. Hopefully <a href="https://github.com/facebook/create-react-app/issues/4421" target="pts">this issue</a> should be fixed in the next release of React.</p>
        </div>
      
        <div className="row">
          <div><PtsCanvas /></div>
          <div>
            <h3>PtsCanvas</h3>
            <p><a href="https://www.npmjs.com/package/react-pts-canvas">PtsCanvas</a> is a basic implementation of Pts in a React component. Install it via <code>npm install react-pts-canvas</code>.</p>
            <p>A quick way to build your own Pts component is to extend the PtsCanvas class, and then override the <code>animate</code> function (and optionally <code>start</code>, <code>action</code>, and <code>resize</code> functions.)</p>
            <Highlight className="xml">{`<PtsCanvas />`}</Highlight>
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
          <p><a href="https://github.com/williamngan/pts-react-example/blob/master/src/PtsCanvas.jsx">Source Code</a></p>
          </div>
        </div>


        <div className="row">
          <div><AnimationExample name="pts_anim" background="#fe3" pause={this.state.pauseAnimation} /></div>
          <div>
            <h3>AnimationExample Component</h3>
            <p>A component that renders a continuous noise pattern. (Might be good as a fancy loading animation.)</p>
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
            <p><a href="https://github.com/williamngan/pts-react-example/blob/master/src/PtsExamples.jsx#L59">Source Code</a></p>
          </div>
        </div>

        <div className="row">
          <div><ChartExample name="pts_chart" background="#0c9" play={false} data={this.chartData} variance={this.state.variance} /></div>
          <div>
            <h3>ChartExample Component</h3>
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
            <p><a href="https://github.com/williamngan/pts-react-example/blob/master/src/PtsExamples.jsx#L8">Source Code</a></p>
          </div>
        </div>
        
      </div>
    );
  }
}