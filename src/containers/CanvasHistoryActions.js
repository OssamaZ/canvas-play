import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ReactTooltip from 'react-tooltip';

// Actions
import {
  clearCanvas
} from '../actions/canvasActions';

const CanvasHistoryActions = ({clearCanvas}) =>
  <div className='editor-actions'>
    <ClearCanvasBtn clearCanvas={clearCanvas} />
    <UndoBtn />
    <RedoBtn />
    <span className=''>Changes Auto-saved</span>
  </div>

const mapDispatchToProps = (dispatch) => {
  return {
    clearCanvas: () => dispatch(clearCanvas())
  }
}

export default connect(null, mapDispatchToProps)(CanvasHistoryActions);

// Tiny buttons.. i LOVE functions
const ClearCanvasBtn = ({clearCanvas}) =>
  <a href="#" className='zmdi zmdi-delete' onClick={e => {
      e.preventDefault();
      clearCanvas();
    }} data-tip data-for="clear-tooltip">
    <ReactTooltip id='clear-tooltip' type="dark" effect="solid" place='bottom' class='tooltip'>
      Clear canvas
    </ReactTooltip>
  </a>

const UndoBtn = () =>
  <a href="#" className={classnames('zmdi zmdi-undo', {'disabled': true})} onClick={e => {
      e.preventDefault();
    }} data-tip data-for="undo-tooltip">
    <ReactTooltip id='undo-tooltip' type="dark" effect="solid" place='bottom' class='tooltip'>
      Undo
    </ReactTooltip>
  </a>

const RedoBtn = () =>
  <a href="#" className={classnames('zmdi zmdi-redo', {'disabled': true})} onClick={e => {
      e.preventDefault();
    }} data-tip data-for="redo-tooltip">
    <ReactTooltip id='redo-tooltip' type="dark" effect="solid" place='bottom' class='tooltip'>
      Redo
    </ReactTooltip>
  </a>
