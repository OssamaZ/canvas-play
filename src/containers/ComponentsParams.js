import React from 'react';
import { connect } from 'react-redux';

// Actions
import {
  deleteComponent
} from '../actions/canvasActions';

const ComponentsParams = ({canvasComponents, activeComponentUID, deleteComponent}) => {
  let _activeComponent = canvasComponents[activeComponentUID];
  return (
    <div className='component-parameters'>
      <h3>Parameters</h3>
      {!_activeComponent ? <p>To update a canvas elements styling, make it active by clicking on it</p> :
        <ComponentParametersUI component={_activeComponent} deleteComponent={deleteComponent} />}
    </div>
  )
}

// .present is the way redux-undo tracks the different versions of my state
const mapStateToProps = ({canvasComponents, activeComponentUID}) => {
  return {
    canvasComponents: canvasComponents.present,
    activeComponentUID: activeComponentUID.present
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComponent: (uid) => dispatch(deleteComponent(uid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentsParams);

// Active component params
const ComponentParametersUI = ({component, deleteComponent}) =>
  <div className='component-params-wrapper'>
    <span>UID: {component.type}/<b>{component.uid}</b></span>
    <a href='#' className='delete' onClick={e => {
        e.preventDefault();
        deleteComponent(component.uid);
      }}>
      DELETE
     </a>
    <p>Other properties</p>
  </div>
