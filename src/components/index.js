import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// Actions
import {
  makeComponentActive,
  updateCanvasComponent
} from '../actions/canvasActions';

import RectangleComponent from './RectangleComponent';

// Mapper Object
const MAPPER_OBJECT = {
  'rectangle': RectangleComponent
}

class CanvasComponentMapper extends Component {

  constructor(props, context) {
    super(props, context);

    // Click
    this.onClick = this.onClick.bind(this);
    // Drag
    this.onDragEnd = this.onDragEnd.bind(this);
    // Resize
    this.resizeCurrentComponent = this.resizeCurrentComponent.bind(this);
  }

  onClick(e) {
    e.cancelBubble = true;
    this.props.makeComponentActive(this.props.component.uid);
  }

  onDragEnd(e) {
    let _newProps = {...this.props.component};
    _newProps.x = e.target.getX();
    _newProps.y = e.target.getY();
    this.props.updateCanvasComponent(this.props.component.uid, _newProps);
  }

  resizeCurrentComponent(e) {
    e.cancelBubble = true;
    // get the recize circle instance
    let activeResizeCirlce = e.target,
        whichResizeCircle = activeResizeCirlce.getName();
    // get the x,y of the instance
    let activeResizeCirlceX = activeResizeCirlce.getX(),
        activeResizeCirlceY = activeResizeCirlce.getY();

    // get all the resize circles (depends on the component type)
    let componentRef = `${this.props.component.uid}-component`,
        groupRef = `${this.props.component.uid}-group`;
    let group = this.refs[componentRef].refs[groupRef];

    let topLeftResizeCircle = group.get('.topLeft')[0],
        topRightResizeCircle = group.get('.topRight')[0],
        bottomRightResizeCircle = group.get('.bottomRight')[0],
        bottomLeftResizeCircle = group.get('.bottomLeft')[0];

    // depending on the x,y of the instance,
    // we should update other resize circles,
    // and x of the component plus it's with/height
    let _newProps = {...this.props.component};
    let _newX = group.getX() - topLeftResizeCircle.getX(),
        _newY = group.getY() - topLeftResizeCircle.getY();

    switch(whichResizeCircle) {
       case 'topLeft':
          _newProps['x'] = group.getX() + activeResizeCirlce.getX();
          _newProps['y'] = group.getY() + activeResizeCirlce.getY();
          _newProps['width'] = topRightResizeCircle.getX() - topLeftResizeCircle.getX();
          _newProps['height'] = bottomLeftResizeCircle.getY() - topLeftResizeCircle.getY();
          break;
    }

    this.props.updateCanvasComponent(this.props.component.uid, _newProps);
  }

  render() {
    let MappedComponent = MAPPER_OBJECT[this.props.component.type];
    let ref = `${this.props.component.uid}-component`;
    return <MappedComponent ref={ref} {...this.props.component}
              onClick={this.onClick}
              resizeCurrentComponent={this.resizeCurrentComponent}
              onDragEnd={this.onDragEnd} />;
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    makeComponentActive: (uid) => dispatch(makeComponentActive(uid)),
    updateCanvasComponent: (uid, newProps) => dispatch(updateCanvasComponent(uid, newProps))
  }
}

export default connect(null, mapDispatchToProps)(CanvasComponentMapper);
