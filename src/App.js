import React, { Component } from 'react';
import PtsChart from './PtsChart.jsx'
import './App.css';

class App extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      variance: 0.2
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

  componentWillUpdate(nextProps, nextState) {
    this.mockData( nextState.variance );
  }

  render() {
    return (
      <div className="App" style={{textAlign: "left"}}>
        <h1>Example of using Pts in React</h1>
        <div >
          <PtsChart data={this.chartData}  />
          <PtsChart bgcolor="#6fa" data={this.chartData}  />
        </div>
        <label>Variance (in steps of 0.05): <input type="number" value={this.state.variance} onChange={this.handleChange.bind(this)} min={0} step={0.05} /></label>
        <a href="https://github.com/williamngan/pts-react-example">Source code</a>
      </div>
    );
  }
}

export default App;
