import React, { useCallback, useEffect, useRef } from "react";
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


/**
 * Animation example component
 * @returns 
 */
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

/**
 * Sound example component
 * @returns 
 */
export const SoundExample = ({background, name, file, credit}) => {
  const soundRef = useRef(null);
  const bins = 256;

  const handleStart = useCallback((bound, space) => {
    Sound.loadAsBuffer( file ).then( s => {
      soundRef.current = s;
      space.playOnce(50); // render for once
    }).catch( e => console.error(e) );
  }, [file]);

  const handleAnimate = useCallback( (space, form) => {
    const sound = soundRef.current;
    if (sound && sound.playable) {
      if (!sound.playing) space.stop(); // stop animation if not playing
      
      const colors = ["#f06", "#62e", "#fff", "#fe3", "#0c9"];
      sound.freqDomainTo(space.size).forEach( (t, i) => {
        form.fillOnly( colors[i%5] ).point( t, 30 );
      });
      form.fillOnly("rgba(0,0,0,.3").text( [20, space.size.y-20], credit );
    }

    drawButton(form);
  }, [credit]);

  const handleAction = (space, form, type, x, y) => {
    if (type === "up" && Geom.withinBound([x, y], [0, 0], [50, 50])) {
      // clicked button
      const sound = soundRef.current;
      if (sound && sound.playing) {
        sound.stop();
      } else {
        sound.createBuffer().analyze(bins); // recreate buffer again
        sound.start();
        space.replay();
      }
    }
  };

  const drawButton = (form) => {
    const sound = soundRef.current;
    if (!sound) {
      form.fillOnly("#9ab").text( [20,30], "Loading..." );
      return;
    }
    if (!sound || !sound.playing) {
      form.fillOnly("#f06").rect( [[0,0], [50,50]] );
      form.fillOnly('#fff').polygon( Triangle.fromCenter( [25,25], 10 ).rotate2D( Const.half_pi, [25,25] ) );
    } else {
      form.fillOnly("rgba(0,0,0,.2)").rect( [[0,0], [50,50]] );
      form.fillOnly("#fff").rect( [[18, 18], [32,32]] );
    }
  }

  
  return (
    <PtsCanvas
      name={name}
      background={background}
      onStart={handleStart}
      onAnimate={handleAnimate}
      onAction={handleAction}
    />
  );

}