import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Point } from '../Point/Point';

export function Chart(props) {
    let points = [];
    props.dataPoints.forEach(point => {
        const {scaledLatitude: x, scaledLongitude: y} = point.coordinates;
        const {mag, time} = point;
        points.push(<Point x={x} y={y} mag={mag} key={time} />)
    });
    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
           <Layer>
                <Text text="HI konva stuff happening here" />
                <Rect
                     x={20}
                     y={20}
                     width={50}
                     height={50}
                     fill={'blue'}
                     shadowBlur={5}
                />
                {points}
           </Layer>
       </Stage>
    )
}

Chart.propTypes = {
    dataPoints: PropTypes.array //.isRequired
}
