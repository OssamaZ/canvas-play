import React from 'react';
import { Layer, Stage } from 'react-konva';

// Rectangle
import Rectangle from '../components/Rectangle';

const CanvasStage = () =>
  <Stage width={680} height={500} className='canvas-container'>
    <Layer>
      <Rectangle />
    </Layer>
  </Stage>

export default CanvasStage;
