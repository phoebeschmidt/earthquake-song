import React, { Component } from 'react';
import './App.css';
import Chart from '../Chart/Chart';
import AudioWrapper from '../AudioWrapper/AudioWrapper';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            earthquakeData: [],
            canvasWidth: 0,
            canvasHeight: 0
        };
        this.callApi = this.callApi.bind(this);
    }

    componentWillMount() {
        this.setState({
            canvasWidth: window.innerWidth - 200,
            canvasHeight: window.innerHeight / 2
        });
    }

    componentDidMount() {
        this.callApi(`/earthquakes`)
         .then(response => response.json())
         .then(res => {
           this.setState({ earthquakeData: res.features });
         })
         .catch(err => console.log(err));
    }

    callApi = (path) => {
        return fetch(path); //${(this.state.canvasWidth > 0) ? "?width=" + this.state.canvasWidth : ""}`);
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Earthquake Song</h1>
                </header>
                <AudioWrapper callApi={this.callApi} >
                    <Chart canvasWidth={this.state.canvasWidth} canvasHeight={this.state.canvasHeight} dataPoints={this.state.earthquakeData}/>
                </AudioWrapper>
                <div className="project-description">
                    <p>
                        These pink dots represent the last {this.state.earthquakeData.length} earthquakes that were recorded in the US by the USGS. <br />
                        The x position of each point represents the time the quake occurred,
                        with the left side being the farthest in the past and the right being the most recent. The y position of each point represents the depth from which the
                        quake occurred. The radius is a scaled based on the magnitude.
                    </p>
                    <p>
                        When you click "Play All", an audio sample plays for each earthquake. Each sound you hear is the same sample, with the volume and playback speed, or "pitch", scaled
                        based on the magnitude and depth, respectively. The time between each sample is relative to the times between each earthquake.
                    </p>
                    <p>
                        For more information and documentation about how these characteristics are measured, visit the <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php">USGS</a> website.
                    </p>
                </div>
            </div>
        );
    }
}

export default App;
