import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// Actions
import {
  deleteComponent,
  updateCanvasComponent
} from '../actions/canvasActions';

const ComponentsParams = ({canvasComponents, activeComponentUID, deleteComponent, updateCanvasComponent}) => {
  let _activeComponent = canvasComponents[activeComponentUID];
  return (
    <div className='component-parameters'>
      <h3>Parameters</h3>
      {!_activeComponent ? <p>To update a canvas elements styling, make it active by clicking on it</p> :
        <ComponentParametersUI component={_activeComponent}
          updateCanvasComponent={updateCanvasComponent}
          deleteComponent={deleteComponent} />}
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
    deleteComponent: (uid) => dispatch(deleteComponent(uid)),
    updateCanvasComponent: (uid, newProps) => dispatch(updateCanvasComponent(uid, newProps))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentsParams);

// Active component params
const ComponentParametersUI = ({component, deleteComponent, updateCanvasComponent}) =>
  <div className='component-params-wrapper'>
    <span>UID: {component.type}/<b>{component.uid}</b></span>
    <a href='#' className='delete' onClick={e => {
        e.preventDefault();
        deleteComponent(component.uid);
      }}>
      DELETE
     </a>
    {Object.keys(component).map(propertyName => {
      // color picker
      if(propertyName === 'fill' || propertyName === 'stroke') {
        return (
          <p key={propertyName}>
            <span>{propertyName}:</span>
            <input type='color' value={component[propertyName]} onChange={e => {
              // console.log(`change the fill/stroke color to: ${e.target.value}`);
              updateCanvasComponent(component.uid, {...component, [propertyName]: e.target.value});
            }} />
          </p>
        )
      }
      return null;
    })}
  </div>
