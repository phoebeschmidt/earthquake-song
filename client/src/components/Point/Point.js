import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'react-konva';

class Point extends React.Component {
    constructor(props) {
        super(props);
        this.focusAndPlay = this.focusAndPlay.bind(this);
        this.temporarilyFocus = this.temporarilyFocus.bind(this);
        this.state = {
            isFocused: false,
            radiusMultiplier: 7,
            focusInterval: 700,
            focusOpacity: 1,
            unfocusOpacity: .3
        }
    }

    temporarilyFocus(ms) {
        this.setState({
            isFocused: true
        });
        setTimeout(() => {
            this.setState({
                isFocused: false
            });
        }, ms);
    }

    focusAndPlay() {
        this.temporarilyFocus(this.state.focusInterval);
        this.props.playClip();
    }

    render() {
        return(
            <Circle
                x={this.props.x}
                y={this.props.y}
                fill={"magenta"}
                radius={this.props.mag * this.state.radiusMultiplier}
                stroke={(this.state.isFocused) ? "black" : ""}
                opacity={(this.state.isFocused) ? this.state.focusOpacity : this.state.unfocusOpacity}
            />)
    }
}

Point.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    mag: PropTypes.number.isRequired,
    playClip: PropTypes.func
};

export default Point;
