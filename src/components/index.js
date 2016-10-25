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

  _resizeRectangale(activeResizeCirlce, propsCopy) {
    // get the recize circle instance
    let whichResizeCircle = activeResizeCirlce.getName();
    // get the x,y of the instance
    let activeResizeCirlceX = activeResizeCirlce.getX(),
        activeResizeCirlceY = activeResizeCirlce.getY();

    // get all the resize circles
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
    switch(whichResizeCircle) {
      case 'topLeft':
        propsCopy['x'] = group.getX() + activeResizeCirlce.getX();
        propsCopy['y'] = group.getY() + activeResizeCirlce.getY();
        propsCopy['width'] = topRightResizeCircle.getX() - activeResizeCirlce.getX();
        propsCopy['height'] = bottomLeftResizeCircle.getY() - activeResizeCirlce.getY();
        break;
      case 'topRight':
        propsCopy['y'] = group.getY() + activeResizeCirlce.getY();
        propsCopy['width'] = activeResizeCirlce.getX() - topLeftResizeCircle.getX();
        propsCopy['height'] = bottomLeftResizeCircle.getY() - activeResizeCirlce.getY();
        break;
      case 'bottomRight':
        propsCopy['width'] = activeResizeCirlce.getX() - bottomLeftResizeCircle.getX();
        propsCopy['height'] = topRightResizeCircle.getY() + activeResizeCirlce.getY();
        break;
      case 'bottomLeft':
        propsCopy['x'] = group.getX() + activeResizeCirlce.getX();
        propsCopy['width'] = bottomRightResizeCircle.getX() - activeResizeCirlce.getX();
        propsCopy['height'] = activeResizeCirlce.getY() - topLeftResizeCircle.getY();
        break;
    }

    // Return edited propsCopy
    return propsCopy;
  }

  resizeCurrentComponent(e, parentType) {
    e.cancelBubble = true;
    // Get the copy, the resize is not pure.
    let _newProps = {...this.props.component};
    if(parentType === 'rect') {
      _newProps = this._resizeRectangale(e.target, _newProps);
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
