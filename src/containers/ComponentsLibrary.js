import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import _ from 'lodash';

// Actions
import {
  changeTheDrawingComponent
} from '../actions/canvasActions';

const ComponentsLibrary = ({componentsList, activeDrawingComponent, changeTheDrawingComponent}) =>
  <ul className="components-library">
    {_.values(componentsList).map(element => (
      <li key={element.type} className={classnames({'active': element.type === activeDrawingComponent})}>
        <a href='#' onClick={e => {
            e.preventDefault();
            changeTheDrawingComponent(element.type);
          }}>
          {element.type}
        </a>
      </li>
    ))}
  </ul>

const mapStateToProps = ({componentsList, activeDrawingComponent}) => {
  return {
    componentsList,
    activeDrawingComponent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTheDrawingComponent: (name) => dispatch(changeTheDrawingComponent(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentsLibrary);
