import React, { useCallback, useState, useMemo, useRef, useEffect } from "react";
import { Pt, Group, Line, Create, Sound, Triangle, Const, Geom } from "pts";
import { PtsCanvas } from "react-pts-canvas";



/**
 * Chart example componet
 * @returns
 */
export const ChartExample = ({ data, background, name }) => {
  const [space, setSpace] = useState(null);
  const [form, setForm] = useState(null);
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    if (space && form) {  // call animate function only when data changes
      space.clear();
      handleAnimate(space, form);
    }
  }, [space, form, data]);

  const handleAnimate = (space, form) => {
    if (!space || !form) return;

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
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <PtsCanvas
        name={name}
        play={hovered}
        background={background}
        onReady={(space, form) => {
          setSpace(space);
          setForm(form);
        }}
        onAnimate={handleAnimate}
      />
    </div>
  );
};

/**
 * Animation example component
 * @returns
 */
export const AnimationExample = ({ name, background, play }) => {
  const [noiseGrid, setNoiseGrid] = useState([]);

  const handleReady = useCallback(
    (space) => {
      const gd = Create.gridPts(space.innerBound, 20, 20);
      setNoiseGrid(Create.noisePts(gd, 0.05, 0.1, 20, 20));
    },
    [setNoiseGrid]
  );

  const handleAnimate = useCallback(
    (space, form, time) => {
      if (!space) return;
      // Use pointer position to change speed
      const speed = space.pointer
        .$subtract(space.center)
        .divide(space.center)
        .abs();

      // Generate noise in a grid
      noiseGrid.forEach((p) => {
        p.step(0.01 * (1 - speed.x), 0.01 * (1 - speed.y));
        form
          .fillOnly("#123")
          .point(p, Math.abs((p.noise2D() * space.size.x) / 18), "circle");
      });
    },
    [noiseGrid]
  );

  const handleResize = useCallback(
    (space) => {
      const gd = Create.gridPts(space.innerBound, 20, 20);
      setNoiseGrid(Create.noisePts(gd, 0.05, 0.1, 20, 20));
    },
    [setNoiseGrid]
  );

  return (
    <PtsCanvas
      name={name}
      background={background}
      play={play}
      onReady={handleReady}
      onResize={handleResize}
      onAnimate={handleAnimate}
    />
  );
};

/**
 * Sound example component
 * @returns
 */
export const SoundExample = ({ background, name, file, credit }) => {
  // const soundRef = useRef(null);
  const [sound, setSound] = useState(null);
  const bins = 256;

  const handleReady = useCallback(
    (space, form, bound) => {
      Sound.loadAsBuffer(file)
        .then((s) => {
          setSound(s);
        })
        .catch((e) => console.error(e));
    },
    [file]
  );

  const handleAnimate = useCallback(
    (space, form) => {
      if (sound && sound.playable) {

        const colors = ["#f06", "#62e", "#fff", "#fe3", "#0c9"];
        sound.freqDomainTo(space.size).forEach((t, i) => {
          form.fillOnly(colors[i % 5]).point(t, 30);
        });
        form.fillOnly("rgba(0,0,0,.3").text([20, space.size.y - 20], credit);
      }

      // Draw button
      if (!sound) {
        form.fillOnly("#9ab").text([20, 30], "Loading...");
        return;
      }
      if (!sound || !sound.playing) {
        form.fillOnly("#f06").rect([
          [0, 0],
          [50, 50],
        ]);
        form
          .fillOnly("#fff")
          .polygon(
            Triangle.fromCenter([25, 25], 10).rotate2D(Const.half_pi, [25, 25])
          );
      } else {
        form.fillOnly("rgba(0,0,0,.2)").rect([
          [0, 0],
          [50, 50],
        ]);
        form.fillOnly("#fff").rect([
          [18, 18],
          [32, 32],
        ]);
      }
    },
    [sound, credit]
  );

  const handleAction = (space, form, type, x, y) => {
    if (type === "up" && Geom.withinBound([x, y], [0, 0], [50, 50])) {
      // clicked button
      if (sound && sound.playing) {
        sound.stop();
      } else {
        sound.createBuffer().analyze(bins); // recreate buffer again
        sound.start();
        space.replay();
      }
    }
  };

  return (
    <PtsCanvas
      name={name}
      play={true}
      background={background}
      onReady={handleReady}
      onAnimate={handleAnimate}
      onAction={handleAction}
    />
  );
};
