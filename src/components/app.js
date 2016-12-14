import React, { Component } from 'react';

import Board from './board';
import Scoreboard from './scoreboard';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Scoreboard />
        <Board size="3"></Board>
      </div>
    );
  }
}

export default App;
