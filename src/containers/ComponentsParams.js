import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ChromePicker } from 'react-color';

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
      // number
      if(['width', 'height', 'strokeWidth', 'radius'].indexOf(propertyName) > -1) {
        return (
          <section key={propertyName}>
            <span>{propertyName === 'strokeWidth' ? 's-width' : propertyName}:</span>
            <input type='number' value={component[propertyName]} onChange={e => {
              let {value} = e.target;
              updateCanvasComponent(component.uid, {...component, [propertyName]: value});
            }} />
          </section>
        )
      }
      // color picker
      else if(['fill', 'stroke'].indexOf(propertyName) > -1) {
        return (
          <section key={propertyName}>
            <span>{propertyName}:</span>
            <ColorPickerWrapper color={component[propertyName]} onChange={color => {
              updateCanvasComponent(component.uid, {...component, [propertyName]: color});
            }} />
          </section>
        )
      }
      return null;
    })}
  </div>

// My color picker wrapper
// Why? because by default, the picker is shown, i don't want it to be visible unless the user clicks on the box
// since it has a state .. well .. no stateless component for u :(
class ColorPickerWrapper extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isVisible: false // default
    }
  }

  render() {
    return (
      <div className='color-picker-wrapper'>
        <a href='#' style={{backgroundColor: this.props.color}} onClick={e => {
            e.preventDefault();
            this.setState({isVisible: !this.state.isVisible});
          }}/>
        {this.state.isVisible && <ChromePicker
          color={this.props.color}
          onChangeComplete={colorObject => {
            let _chosenColor = colorObject.hex;
            // Do you want to support rgba? well ..
            if(colorObject.rgb.a < 1) {
              let {r,g,b,a} = colorObject.rgb;
              _chosenColor = `rgba(${r},${g},${b},${a})`;
            }
            this.props.onChange(_chosenColor);
          }} />}
      </div>
    )
  }

}
