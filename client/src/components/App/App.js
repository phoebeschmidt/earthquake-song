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
          canvasHeight: window.innerHeight /2
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
          </div>
      );
  }
}

export default App;
