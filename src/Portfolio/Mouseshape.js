import React, { useRef } from "react";
import useMeasure from "react-use-measure";
import { useTrail, animated } from "@react-spring/web";

import styles from "./styles.module.css";

const fast = { tension: 1200, friction: 60 };
const slow = { mass: 50, tension: 100, friction: 50 };

const trans = (x, y) =>
  `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

export default function Mouseshape() {
  const [trail, api] = useTrail(3, (i) => ({
    xy: [0, 0],
    config:   slow,
  }));
  const [ref, { left, top }] = useMeasure();
  const containerRef = useRef();

  const handleMouseMove = (e) => {
    api.start({ xy: [e.clientX - left, e.clientY - top] });
  };
  const handleMouseDown = (e) => {
  //
  };
  return (
    <>
      <svg style={{ position: "fixed", width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="linear" stdDeviation="10" />
          <feColorMatrix
            in="linear"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -9"
          />
        </filter>
      </svg>
      <div
        
        className={styles.hooksMain}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        ref={containerRef}
      >
        {trail.map((props, index) => (
          <animated.div key={index} style={{ transform: props.xy.to(trans) }} />
        ))}
      </div>
    </>
  );
}
