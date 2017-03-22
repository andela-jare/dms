import React, { Component } from 'react';
import Nav from './components/header/nav';
import Login from './components/login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <br/>
        <Login />
      </div>
    );
  }
}

export default App;
