import React from 'react';
import PropTypes from 'prop-types';

export function BoldText(props) {
    return (
        <span style={{fontWeight: "bold"}}>{props.text}</span>
    )
}

BoldText.propTypes = {
    text: PropTypes.string.isRequired
};