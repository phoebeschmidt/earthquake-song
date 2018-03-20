import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import { Point } from '../Point/Point';
import { ChartToolbar } from '../ChartToolbar/ChartToolbar';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPoints: [],
            xBuffer: (window.innerWidth - props.canvasWidth) / 2,
            yBuffer: 100,
            timeBuffer: 10
        }

    }

    playAll(arr, timeBuffer) {
        return () => {
            arr.forEach((x, i) => {
                setTimeout(() => {
                    let newSelectedPoints = this.state.selectedPoints;
                    newSelectedPoints[i] = true;
                    this.setState({
                        selectedPoints: newSelectedPoints
                    });
                    setTimeout(() => {
                        let newSelectedPoints = this.state.selectedPoints;
                        newSelectedPoints[i] = false;
                        this.setState({
                            selectedPoints: newSelectedPoints
                        })
                    }, x.scaledTime)
                }, timeBuffer + (x.scaledTime * timeBuffer))
            })

        }
    }

    render() {
        let earthquakePoints = [];
        this.props.dataPoints.forEach((point, i) => {
            const {mag, time, scaledTime} = point;
            const { scaledDepth } = point.coordinates;
            earthquakePoints.push(<Point x={this.state.xBuffer + scaledTime}
                               y={this.state.yBuffer + scaledDepth}
                               mag={mag || 1}
                               key={time}
                               isFocused={(this.state.selectedPoints.length > i) ? this.state.selectedPoints[i] : false}
                         />);
        });
        return (
          <div>
              <ChartToolbar playAllCallback={this.playAll(this.props.dataPoints, this.state.timeBuffer)} />
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
    canvasHeight: PropTypes.number.isRequired
}

export default Chart;
