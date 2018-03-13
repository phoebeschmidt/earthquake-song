import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
   response: ''
 };

 componentDidMount() {
   this.callApi()
     .then(res => this.setState({ response: res.express }))
     .catch(err => console.log(err));
 }

 callApi = () => {
   return fetch('/api/hello')
      .then(results => {
          results = results.json();
          console.log(results);
          return results;
      })
 };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.response}
        </p>
      </div>
    );
  }
}

export default App;
