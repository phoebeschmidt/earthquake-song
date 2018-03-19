import React from 'react';
import PropTypes from 'prop-types';

export function ChartToolbar(props) {
    return (
        <div>
            <button onClick={props.playAllCallback}>Play All</button>
        </div>
    )
}

ChartToolbar.propTypes = {
    fetchCallback: PropTypes.func,
    playAllCallback: PropTypes.func,
    playNextCallback: PropTypes.func,
    playPrevCallback: PropTypes.func
}
