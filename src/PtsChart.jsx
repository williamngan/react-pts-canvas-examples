import React, { Component } from 'react';
import {CanvasSpace, Pt, Group, Line} from 'pts';

export default class PtsChart extends Component {

  

  createChart() {
    
    // Create Space and Form
    // pass the ref canvas element directly into CanvasSpace
    this.space = new CanvasSpace( this.ptsCanvas ).setup({bgcolor: this.props.bgcolor || "#6cf", resize: true, retina: true});
    this.form = this.space.getForm();

    
    this.renderChart = () => {

      // Given the data, distribute bars across the space's size
      let w = (this.space.size.x) / this.props.data.length;
      let bars = this.props.data.map( (d,i) => {
        return new Group( new Pt(i*w, this.space.size.y), new Pt( i*w, this.space.size.y-d*this.space.size.y-1) );
      });
      
      // Draw a line controlled by mouse pointer
      let line = new Group(new Pt(0, this.space.size.y/2), new Pt( this.space.size.x, this.space.pointer.y ) );
      this.form.stroke("#fff", 3).line( line, 10, "circle" );

      // Draw the bars and also check intersection with the pointer's line
      let intersects = bars.map( (b, i) => {
        this.form.stroke("#123",w-1).line( bars[i]  );
        return Line.intersectLine2D( b, line )
      });

      // Draw intersection points
      this.form.fillOnly("#f6c").points( intersects, w/2 );
      
    }
    
    this.space.add({
      
      // render
      animate:() => {
        if (this.form.ready) this.renderChart();
      },

      // Mouse or touch action
      action: (type, x, y) => {
        this.space.clear(); // since we're not animating continuously, manually clear canvas and re-render chart
        this.renderChart();
      },

      resize: (bound) => {
        if (this.form.ready) {
          this.space.clear();
          this.renderChart();
        }
        
      }
    });
    

    // bind mouse and touch
    this.space.bindMouse().bindTouch();

    // Only animate once initially, no need to continuously animate if chart is not changing
    this.space.playOnce(0);
  }
  

  // Create chart on mount
  componentDidMount() {
    this.createChart();
  }


  // When data is updated, re-render by playing animate() once
  componentDidUpdate() {
    console.log( "updated" );
    this.space.playOnce(0);
  }

  
  render() {
    
    return <div className="pts-chart">
      <canvas ref={(canvas) => { this.ptsCanvas = canvas; }}></canvas>
    </div>;
  }
}