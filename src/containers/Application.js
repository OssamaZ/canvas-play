import React from 'react';

// Containers
import ComponentsLibrary from './ComponentsLibrary';

const Application = () =>
  <div className='container-wrapper'>
    <section className='editor-actions-container'>
      <h3>Canvas playground</h3>
    </section>
    <section className='editor-container'>
      <ComponentsLibrary />
      <div className='canvas-container' />
      <div className='component-parameters' />
    </section>
  </div>

export default Application;
