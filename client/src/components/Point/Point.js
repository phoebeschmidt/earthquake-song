import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'react-konva';

export function Point(props) {
    return(
      <Circle
          x={props.x}
          y={props.y}
          fill={"magenta"}
          radius={props.mag * 7}
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
