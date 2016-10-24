import React from 'react';
import { Rect } from 'react-konva';

const Rectangle = () =>
  <Rect
    x={100} y={200}
    width={100} height={100}
    fill={'#fdfdfd'}
    stroke={'#000'}
    strokeWidth={1} />

export default Rectangle;
