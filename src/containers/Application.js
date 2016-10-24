import React from 'react';

// Containers
import ComponentsLibrary from './ComponentsLibrary';
import CanvasHistoryActions from './CanvasHistoryActions';
import ComponentsParams from './ComponentsParams';

const Application = () =>
  <div className='container-wrapper'>
    <section className='editor-actions-container'>
      <h3>Canvas playground</h3>
      <CanvasHistoryActions />
    </section>
    <section className='editor-container'>
      <ComponentsLibrary />
      <div className='canvas-container' />
      <ComponentsParams />
    </section>
  </div>

export default Application;
