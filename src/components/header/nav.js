import React, { Component } from 'react';
import AppBarComposition from './appBar';
import './nav.css';

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <AppBarComposition />
      </div>
    );
  }
}

export default Nav;
