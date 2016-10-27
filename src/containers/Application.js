import React from 'react';

// Containers
import ComponentsLibrary from './ComponentsLibrary';
import CanvasHistoryActions from './CanvasHistoryActions';
import ComponentsParams from './ComponentsParams';
import CanvasStage from './CanvasStage';

const Application = () =>
  <div className='container-wrapper'>
    <section className='editor-actions-container'>
      <h3>Canvas playground</h3>
      <span>- Double click on the canvas to add the selected component</span>
      <CanvasHistoryActions />
    </section>
    <section className='editor-container'>
      <ComponentsLibrary />
      <CanvasStage />
      <ComponentsParams />
    </section>
  </div>

export default Application;
