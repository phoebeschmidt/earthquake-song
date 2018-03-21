import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'react-konva';

class Point extends React.Component {
    constructor(props) {
        super(props);
        this.focusAndPlay = this.focusAndPlay.bind(this);
        this.temporarilyFocus = this.temporarilyFocus.bind(this);
        this.state = {
            isFocused: false
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
        this.temporarilyFocus(700);
        this.props.playClip();
    }

    render() {
        return(
            <Circle
                x={this.props.x}
                y={this.props.y}
                fill={"magenta"}
                radius={this.props.mag * 7}
                stroke={(this.state.isFocused) ? "black" : ""}
                opacity={(this.state.isFocused) ? 1 : .3}
            />)
    }
}

Point.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    mag: PropTypes.number.isRequired,
    isFocused: PropTypes.bool.isRequired,
    playClip: PropTypes.func
};

export default Point;
