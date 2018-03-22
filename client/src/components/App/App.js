import React, { Component } from 'react';
import './App.css';
import Chart from '../Chart/Chart';
import AudioWrapper from '../AudioWrapper/AudioWrapper';
import { BoldText } from "./BoldText";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            earthquakeData: [],
            canvasWidth: 0,
            canvasHeight: 0,
            offsetMax: 90,
            pageSizeMax: 65,
            pageSizeMin: 20
        };
        this.callApi = this.callApi.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updateWithRandomData = this.updateWithRandomData.bind(this);
    }

    componentWillMount() {
        this.setState({
            canvasWidth: window.innerWidth - 200, //attempts to pad the canvas a bit
            canvasHeight: window.innerHeight / 2
        });
    }

    componentDidMount() {
        this.callApi('/earthquakes').then(this.updateState);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    updateState(rawResponse) {
        rawResponse.json().then(res => {
            this.setState({ earthquakeData: res.features });
        })
        .catch(err => console.log(err));
    }

    callApi = (path, offset = null, pageSize =  null) => {
        if (offset || pageSize) {
            path = path + '?';
            let params = new URLSearchParams();
            if (offset) {
                params.append("offset", offset);
            }
            if (pageSize) {
                params.append("pageSize", pageSize);
            }
            path = path + params.toString();
        }
        return fetch(path);
    };

    updateWithRandomData() {
        const randomOffset = this.getRandomInt(0, this.state.offsetMax);
        const randomPageSize = this.getRandomInt(this.state.pageSizeMin, this.state.pageSizeMax);
        this.callApi('/earthquakes', randomOffset, randomPageSize).then(this.updateState);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Earthquake Song</h1>
                </header>
                <button onClick={this.updateWithRandomData}>New Data</button>
                <AudioWrapper callApi={this.callApi} >
                    <Chart canvasWidth={this.state.canvasWidth} canvasHeight={this.state.canvasHeight} dataPoints={this.state.earthquakeData}/>
                </AudioWrapper>
                <div className="project-description">
                    <p>
                        These pink dots represent {this.state.earthquakeData.length} earthquakes that were recorded in the US by the USGS. <br />
                        The (x,y) coordinates of each point are the scaled (time, depth) that each quake occurred. Left side of the screen is farthest in the past, right is most recent.
                        Top of the screen is most shallow, bottom is deepest. The radius is scaled by the magnitude of the earthquake.
                    </p>
                    <p>
                        When you click <BoldText text="Play All" />, an audio sample plays for each earthquake. Each sound you hear is the same sample. The volume is proportional
                        to the magnitude, and the depth is inversely proportional to the playback rate. Playback rate affects the "pitch" you hear.
                        (volume --> magnitude, 100/(depth + .01) --> playback rate). Deeper earthquakes then have a deeper "pitch", and larger scale earthquakes have a louder tone.
                        The time offset of a note from the beginning of the song is proportional to the amount of "real world time" between the first earthquake in the set and the
                        earthquake represented by the note. After playing, each point remains "focused" (bold, opaque, and with an outline) for a fixed amount of time.
                    </p>
                    <p>
                        When you click <BoldText text="New Data" />, the client does a new request to the server with randomized offset and pageSize parameters. You receive a different set of
                        earthquakes and a new song!
                    </p>
                    <p>
                        For more information and documentation about how these properties are measured, visit the <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php">USGS</a> website
                        or explore the full dataset <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson">here</a>.
                    </p>
                </div>
            </div>
        );
    }
}

export default App;
