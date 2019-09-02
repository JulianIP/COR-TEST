import React, { Component } from 'react';
import { render } from 'react-dom';
import Main from './containers/Main';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'COR'
    };
  }

  render() {
    return (
      <Main />
    );
  }
}

render(<App />, document.getElementById('root'));
