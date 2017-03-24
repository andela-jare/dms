import React, { Component } from 'react';
import Nav from './components/header/nav';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <br/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
