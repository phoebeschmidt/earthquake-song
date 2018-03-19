import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Line, Label, Circle } from 'react-konva';
import { Point } from '../Point/Point';
import { ChartToolbar } from '../ChartToolbar/ChartToolbar';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPoints: [],
            xBuffer: window.innerWidth / 3,
            yBuffer: 100,
            timeBuffer: 10
        }

    }

    playAll(arr, timeBuffer) {
        return () => {
            arr.forEach((x, i) => {
              console.log(x.scaledTime, timeBuffer + (x.scaledTime * timeBuffer), i);
                setTimeout(() => {
                    let newSelectedPoints = this.state.selectedPoints;
                    newSelectedPoints[i] = true;
                    // newSelectedPoints[i-1] = false;
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
                    // if(i === arr.length - 1) {
                    //     setTimeout(() => {
                    //         newSelectedPoints[i] = false;
                    //         this.setState({
                    //             selectedPoints: newSelectedPoints
                    //         })
                    //     }, timeBuffer)
                    // }
                }, timeBuffer + (x.scaledTime * timeBuffer))
            })

        }
    }

    render() {
        let earthquakePoints = [];
        let axisPoints = [];
        let labels = [];
        this.props.dataPoints.forEach((point, i) => {
            const {mag, time, scaledTime} = point;
            let xPoint = this.state.xBuffer + scaledTime;
            axisPoints.push(xPoint, this.state.yBuffer + 100);
            earthquakePoints.push(<Point x={xPoint}
                               y={this.state.yBuffer}
                               mag={mag}
                               key={time}
                               isFocused={(this.state.selectedPoints.length > i) ? this.state.selectedPoints[i] : false}
                         />);
            labels.push(<Label x={xPoint} y={this.state.yBuffer + 100 + 25} stroke={"black"} fill={"green"}/>,
                        <Circle x={xPoint} y={this.state.yBuffer + 100} fill={"black"} stroke={"black"} radius={1}/>);
        });
        return (
          <div>
              <ChartToolbar playAllCallback={this.playAll(this.props.dataPoints, this.state.timeBuffer)} />
              <Stage width={this.props.canvasWidth} height={this.props.canvasHeight}>
                 <Layer>
                      {earthquakePoints}
                      <Line points={axisPoints} tension={0} stroke={"black"}  />
                      {labels}
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
