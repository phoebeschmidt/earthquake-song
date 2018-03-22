import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import Point from '../Point/Point';
import { ChartToolbar } from '../ChartToolbar/ChartToolbar';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPoints: [],
            xBuffer: (window.innerWidth - props.canvasWidth) / 2,
            yBuffer: 100,
            timeBuffer: 7
        };
        this.points = [];
    }

    componentWillReceiveProps() {
        this.points = [];
    }
    playAll(timeBuffer) {
        return () => {
            this.points.forEach((p) => {
                if (!p) {
                    return false;
                }
                setTimeout(() => {
                    p.focusAndPlay();
                    p.props.playClip();
                }, timeBuffer + (p.props.x * timeBuffer));
            })
        }
    }

    render() {
        let earthquakePoints = [];
        this.props.dataPoints.forEach((point, i) => {
            const {mag, scaledMag, time, scaledTime} = point;
            const { scaledDepth, depth } = point.coordinates;
            const playClip = () => {
                this.props.playClipCallback(depth, scaledMag);
            };
            const refFn = (node) => {
                this.points.push(node);
            };
            earthquakePoints.push(
                <Point
                    ref={refFn}
                    x={this.state.xBuffer + scaledTime}
                    y={this.state.yBuffer + scaledDepth}
                    mag={mag || 1}
                    key={time}
                    isFocused={(this.state.selectedPoints.length > i) ? this.state.selectedPoints[i] : false}
                    playClip={playClip}
                />);
        });
        return (
          <div>
              <ChartToolbar playAllCallback={this.playAll(this.state.timeBuffer)} />
              <Stage width={this.props.canvasWidth} height={this.props.canvasHeight}>
                 <Layer>
                      {earthquakePoints}
                 </Layer>
             </Stage>
         </div>
        )
    }

}

Chart.propTypes = {
    dataPoints: PropTypes.array.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired,
    playClipCallback: PropTypes.func
};

export default Chart;
