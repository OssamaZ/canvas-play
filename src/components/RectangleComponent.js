import React, { Component } from 'react';
import { Rect, Group } from 'react-konva';

// Resize circles
import ResizeCircle from './ResizeCircle';

export default class RectangleComponent extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let groupRef = `${this.props.uid}-group`;
    let rectangleRef = `${this.props.uid}-rectangle`;
    return (
      <Group
        ref={groupRef}
        name={groupRef}
        x={this.props.x}
        y={this.props.y}
        draggable={true}
        onDragend={this.props.onDragEnd}
        onClick={this.props.onClick}>
        <Rect
          ref={rectangleRef}
          name={rectangleRef}
          width={this.props.width} height={this.props.height}
          fill={this.props.fill}
          stroke={this.props.stroke}
          strokeWidth={this.props.strokeWidth} />
          <ResizeCircle name="topLeft" x={0} y={0}
            resizeCb={this.props.resizeCurrentComponent} />
          <ResizeCircle name="topRight" x={this.props.width} y={0} 
            resizeCb={this.props.resizeCurrentComponent} />
          <ResizeCircle name="bottomRight" x={this.props.width} y={this.props.height}
            resizeCb={this.resizeCurrentComponent} />
          <ResizeCircle name="bottomLeft" x={0} y={this.props.height}
            resizeCb={this.props.resizeCurrentComponent} />
      </Group>
    );
  }

}
