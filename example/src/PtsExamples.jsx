import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pt, Group, Line, Create, Sound, Triangle, Const, Geom } from "pts";
import { PtsCanvas } from "react-pts-canvas";

const mockData = function( v ) {
  let gaussian = (x) => {
    let mean = 0;
    return (1 / Math.sqrt( 2 * Math.PI * v ) ) * Math.exp( -(x-mean)*(x-mean)/(2*v) );
  };

  let chartData = [];
  for (let i=-5; i<5; i+=0.1) {
    chartData.push( gaussian(i) );
  }
  return chartData;
};


/**
 * Chart example componet
 * @returns 
 */
export const ChartExample = ({variance, background, name}) => {

  const dataRef = useRef([]);

  useEffect( () => {
    dataRef.current = mockData(variance);
  }, [variance])

  const handleAnimate = (space, form) => {
    if (!space || !form) return;

    // Given the data, distribute bars across the space's size
    const data = dataRef.current;
    
    let w = space.size.x / data.length;
    let bars = data.map((d, i) => {
      return new Group(
        new Pt(i * w, space.size.y),
        new Pt(i * w, space.size.y - d * space.size.y - 1)
      );
    });

    // Draw a line controlled by mouse pointer
    let line = new Group(
      new Pt(0, space.pointer.y),
      new Pt(space.size.x, space.pointer.y)
    );
    form.stroke("#fff", 3).line(line, 10, "circle");

    // Draw the bars and also check intersection with the pointer's line
    let intersects = bars.map((b, i) => {
      form.stroke("#123", w - 1).line(bars[i]);
      return Line.intersectLine2D(b, line);
    });

    // Draw intersection points
    form.fillOnly("#f6c").points(intersects, w / 2);
  };

  return (
    <PtsCanvas
      name={name}
      background={background}
      onAnimate={handleAnimate}
      onAction={(space, form, type) => {
        if (type === "move") {
          space.clear();
          handleAnimate(space, form);
        }
      }}
    />
  );
};


export const AnimationExample = ({name, background, play}) => {
  const noiseGrid = useRef([]);

  const reset = (space) => {
    const gd = Create.gridPts( space.innerBound, 20, 20 );
    noiseGrid.current = Create.noisePts( gd, 0.05, 0.1, 20, 20 );
  }

  const handleAnimate = (space, form, time) => {
    // Use pointer position to change speed
    const speed = space.pointer.$subtract( space.center ).divide( space.center ).abs();

    // Generate noise in a grid
    noiseGrid.current.forEach( (p) => {
      p.step( 0.01*(1-speed.x), 0.01*(1-speed.y) );
      form.fillOnly("#123").point( p, Math.abs( p.noise2D() * space.size.x/18 ), "circle" );
    });
  }

  return (
    <PtsCanvas
      name={name}
      background={background}
      play={play}
      onStart={(bound, space) => reset(space)}
      onResize={reset}
      onAnimate={handleAnimate}
    />
  );
}