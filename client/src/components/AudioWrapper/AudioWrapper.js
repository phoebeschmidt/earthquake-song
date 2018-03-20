import React from 'react';
import PropTypes from 'prop-types';

class AudioWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.playClip = this.playClip.bind(this);
        this.state = {
            context: new AudioContext()
        }
    }

    componentDidMount() {
        this.props.callApi(`/sound`)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.state.context.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                this.setState({
                    audioClip: audioBuffer
                });
            });
    }

    playClip(playbackRate, volume) {
        const source = this.state.context.createBufferSource();
        const gain = this.state.context.createGain();
        gain.connect(this.state.context.destination);
        source.buffer = this.state.audioClip;
        gain.gain.value = volume;
        source.connect(gain);
        source.playbackRate.value =  playbackRate;
        source.start(this.state.context.currentTime);
    }


    render() {
        const childrenWithProps = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {playClipCallback: this.playClip})
        });
        return (
            <div>
                {childrenWithProps}
            </div>
        )
    }
}

AudioWrapper.propTypes = {
    callApi: PropTypes.func.isRequired
}

export default AudioWrapper;
