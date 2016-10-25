import React from 'react';
import { Circle } from 'react-konva';

const ResizeCircle = ({x, y, name, resizeCb}) =>
  <Circle
    x={x} y={y}
    radius={4}
    name={name}
    fill="#fff"
    stroke='#2790c3'
    strokeWidth={1}
    draggable={true}
    dragOnTop={false}
    onDragMove={e => resizeCb(e)}
    onDragEnd={e => {
      // Prevents redrawing of the resize circle, and let the redux store update take care of it
      e.cancelBubble = true
    }}
  />

export default ResizeCircle;
