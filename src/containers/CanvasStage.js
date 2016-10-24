import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Layer, Stage } from 'react-konva';

// Actions
import {
  addComponentToCanvas
} from '../actions/canvasActions';

// Rectangle
import Rectangle from '../components/Rectangle';

class CanvasStage extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    // Stage - is a div wrapper
    // Layer - is a <canvas> element on the page
    // so you can use several canvases. It may help you to improve performance a lot.
    return (
      <Stage width={680} height={500} ref="myStage" className='canvas-container' onContentClick={e => {
          let {x,y} = this.refs.myStage.getStage().getPointerPosition();
          this.props.dispatch(addComponentToCanvas('rectangle',x,y));
        }}>
        <Layer>
          {_.values(this.props.canvasComponents).map(canvasComponent => (
            <Rectangle key={canvasComponent.uid} />
          ))}
        </Layer>
      </Stage>
    );
  }

}

const mapStateToProps = ({canvasComponents}) => {
	return {
    canvasComponents
	}
}

export default connect(mapStateToProps)(CanvasStage);
