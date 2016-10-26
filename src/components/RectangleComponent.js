import React, { Component } from 'react';
import { Rect, Group } from 'react-konva';

// Resize circles
import ResizeCircle from './ResizeCircle';

export default class RectangleComponent extends Component {
  constructor(props, context) {
    super(props, context);

    // Resize
    this._onResize = this._onResize.bind(this);
  }

  _onResize(e) {
    e.cancelBubble = true;
    let activeResizeCirlce = e.target;

    // Get the copy, the resize is not pure.
    let _newProps = {...this.props.componentInstance};

    // get the recize circle instance
    let whichResizeCircle = activeResizeCirlce.getName();

    // get all the resize circles
    let group = this.refs.myGroup;

    let topLeftResizeCircle = group.get('.topLeft')[0],
        topRightResizeCircle = group.get('.topRight')[0],
        bottomRightResizeCircle = group.get('.bottomRight')[0],
        bottomLeftResizeCircle = group.get('.bottomLeft')[0];

    // depending on the instance, we should update x, y, width and height of our group
    switch(whichResizeCircle) {
      case 'topLeft':
        _newProps['x'] = group.getX() + activeResizeCirlce.getX();
        _newProps['y'] = group.getY() + activeResizeCirlce.getY();
        _newProps['width'] = topRightResizeCircle.getX() - activeResizeCirlce.getX();
        _newProps['height'] = bottomLeftResizeCircle.getY() - activeResizeCirlce.getY();
        break;
      case 'topRight':
        _newProps['y'] = group.getY() + activeResizeCirlce.getY();
        _newProps['width'] = activeResizeCirlce.getX() - topLeftResizeCircle.getX();
        _newProps['height'] = bottomLeftResizeCircle.getY() - activeResizeCirlce.getY();
        break;
      case 'bottomRight':
        _newProps['width'] = activeResizeCirlce.getX() - bottomLeftResizeCircle.getX();
        _newProps['height'] = topRightResizeCircle.getY() + activeResizeCirlce.getY();
        break;
      case 'bottomLeft':
        _newProps['x'] = group.getX() + activeResizeCirlce.getX();
        _newProps['width'] = bottomRightResizeCircle.getX() - activeResizeCirlce.getX();
        _newProps['height'] = activeResizeCirlce.getY() - topLeftResizeCircle.getY();
        break;
    }

    this.props.updateCanvasComponent(this.props.componentInstance.uid, _newProps);
  }

  render() {
    // Props
    let {x, y, width, height, fill, stroke, strokeWidth} = this.props.componentInstance;
    return (
      <Group
        ref='myGroup'
        x={x}
        y={y}
        draggable={true}
        onDragend={this.props.onDragEnd}
        onClick={this.props.onClick}>
        <Rect
          ref='myRectangle'
          width={width} height={height}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth} />
          <ResizeCircle name="topLeft"
            x={0} y={0} parent="rect"
            resizeCb={this._onResize} />
          <ResizeCircle name="topRight"
            x={width} y={0} parent="rect"
            resizeCb={this._onResize} />
          <ResizeCircle name="bottomRight"
            x={width} y={height} parent="rect"
            resizeCb={this._onResize} />
          <ResizeCircle name="bottomLeft"
            x={0} y={height} parent="rect"
            resizeCb={this._onResize} />
      </Group>
    );
  }
}
