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

  render() {
    let MappedComponent = MAPPER_OBJECT[this.props.component.type];
    let ref = `${this.props.component.uid}-component`;
    return <MappedComponent ref={ref}
              componentInstance={this.props.component}
              onClick={this.onClick}
              updateCanvasComponent={this.props.updateCanvasComponent}
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
