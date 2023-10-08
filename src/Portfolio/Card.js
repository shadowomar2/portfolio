import React, { useState } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';

import styles from './styles.module.css';
import { Merged } from '@react-three/drei';

const cards = [

 
  'images/omar3.png',
  'images/omar4.png',
  'images/omar5.png',
  'images/omar6.png',
  'images/omar7.png',
  'images/omar8.png',
  'images/omar10.png',
  'images/omar11.png',
  'images/omar12.png',
  'images/omar1.png',
 
];


const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck() {
  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [  xDir], velocity }) => {
    const trigger = velocity > 0.2;
    const dir = xDir < 0 ? -1 : 1;
    if (!down && trigger) gone.add(index);
    api.start((i) => {
      if (index !== i) return;
      const isGone = gone.has(index);
      const x = isGone ? ( 200) * dir : down ? mx : 0;
   
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
      
      const scale = down ? 1.1 : 1;
      return {
        x,
       
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      };
    });
    if (!down && gone.size === cards.length)
      setTimeout(() => {
        gone.clear();
        api.start((i) => to(i));
      }, 600);
  });

  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className={styles.deck} key={i} style={{ x, y }}>
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${process.env.PUBLIC_URL}/${cards[i]})`,
            
            }}
          />
        </animated.div>
      ))}
    </>
  );
}

export default function Card() {
  return (
    <div className={styles.container}>
      <Deck />
    </div>
  );
}
