import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

// Actions
import {
  clearCanvas
} from '../actions/canvasActions';

const CanvasHistoryActions = ({canUndo, canRedo, clearCanvas, undo, redo}) =>
  <div className='editor-actions'>
    <ClearCanvasBtn clearCanvas={clearCanvas} />
    <UndoBtn canUndo={canUndo} undo={undo} />
    <RedoBtn canRedo={canRedo} redo={redo} />
    <span className=''>Changes Auto-saved</span>
  </div>

const mapStateToProps = ({canvasComponents}) => {
  return {
    canUndo: canvasComponents.past.length > 0,
    canRedo: canvasComponents.future.length > 0
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCanvas: () => dispatch(clearCanvas()),
    undo: () => dispatch(UndoActionCreators.undo()),
    redo: () => dispatch(UndoActionCreators.redo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasHistoryActions);

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

const UndoBtn = ({canUndo, undo}) =>
  <a href="#" className={classnames('zmdi zmdi-undo', {'disabled': !canUndo})} onClick={e => {
      e.preventDefault();
      undo();
    }} data-tip data-for="undo-tooltip">
    <ReactTooltip id='undo-tooltip' type="dark" effect="solid" place='bottom' class='tooltip'>
      Undo
    </ReactTooltip>
  </a>

const RedoBtn = ({canRedo, redo}) =>
  <a href="#" className={classnames('zmdi zmdi-redo', {'disabled': !canRedo})} onClick={e => {
      e.preventDefault();
      redo();
    }} data-tip data-for="redo-tooltip">
    <ReactTooltip id='redo-tooltip' type="dark" effect="solid" place='bottom' class='tooltip'>
      Redo
    </ReactTooltip>
  </a>
