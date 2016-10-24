import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';

const CanvasHistoryActions = () =>
  <div className='editor-actions'>
    <a href="#" className='zmdi zmdi-delete' />
    <a href="#" className={classnames('zmdi zmdi-undo', {'disabled': false})} />
    <a href="#" className={classnames('zmdi zmdi-undo', {'disabled': true})} />
    <span className=''>Changes Auto-saved</span>
  </div>

export default CanvasHistoryActions;
