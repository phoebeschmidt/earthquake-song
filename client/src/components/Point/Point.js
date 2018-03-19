import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'react-konva';

export function Point(props) {
    return(
      <Circle
          x={props.x}
          y={props.y}
          fill={"magenta"}
          radius={props.mag * 10}
          stroke={(props.isFocused) ? "black" : ""}
          opacity={(props.isFocused) ? 1 : .3}
      />
    )
}

Point.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  mag: PropTypes.number.isRequired,
  isFocused: PropTypes.bool.isRequired
}


// {
// mag: 1.9,
// place: "89km NW of Larsen Bay, Alaska",
// time: 1521399362054,
// scaledTime: 94.17179965553022,
// updated: 1521399556811,
// tsunami: 0,
// gap: null,
// nst: null,
// coordinates: {
// latitude: 58.0599,
// longitude: -155.1272,
// scaledLatitude: 0.4618104485420839,
// scaledLongitude: 500.0040756807466,
// depth: 49
// }
// },
