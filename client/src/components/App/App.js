import React, { Component } from 'react';
import './App.css';
import { Chart } from '../Chart/Chart';

class App extends Component {
  state = {
   response: '',
   earthquakeData: []
 };

 componentDidMount() {
   this.callApi()
     .then(response => response.json())
     .then(res => {
       console.log(res.features);
       this.setState({ earthquakeData: res.features });
     })
     .catch(err => console.log(err));
 }

 callApi = () => {
   return fetch('/earthquakes');
 };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Earthquake Song</h1>
        </header>
        <p className="App-intro">
          {this.state.response}
        </p>
        <Chart dataPoints={this.state.earthquakeData}/>
      </div>
    );
  }
}

export default App;
