import React, { Component } from 'react';
import { Circle, Group } from 'react-konva';

// Resize circles
import ResizeCircle from './ResizeCircle';

export default class CircleComponent extends Component {
  constructor(props, context) {
    super(props, context);

    // Resize
    this._onResize = this._onResize.bind(this);
  }

  _onResize(e) {
    e.cancelBubble = true;
    let activeResizeCirlce = e.target;

    // Get the copy, the resize is not pure.
    let _newRad = -(e.target.getY());
    //this.props.componentInstance.radius + (this.refs.myGroup.getY() - activeResizeCirlce.getY());
    let _newProps = {
      ...this.props.componentInstance,
      radius: _newRad < 0 ? 0 : _newRad
    };

    this.props.updateCanvasComponent(this.props.componentInstance.uid, _newProps);
  }

  render() {
    // Props
    let {x, y, radius, fill, stroke, strokeWidth} = this.props.componentInstance;
    return (
      <Group
        ref='myGroup'
        x={x}
        y={y}
        draggable={true}
        onDragend={this.props.onDragEnd}
        onClick={this.props.onClick}>
        <Circle
          ref='myCircle'
          radius={radius}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth} />
          <ResizeCircle
            name="top"
            x={0} y={-radius}
            resizeCb={this._onResize} />
      </Group>
    );
  }
}
