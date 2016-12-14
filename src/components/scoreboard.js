import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import axios from 'axios';

class Scoreboard extends Component{
  constructor(props){
    super(props);
    this.ping();
  }
  ping(){
    this.props.connection(false);
    axios.head('http://localhost:3000/')
      .then(response => response.statusText == 'OK' ? this.props.connection(true) : this.props.connection(false));
  }
  renderButton(){
    if(this.props.board.grid.some(a => a.some(b => b != 0))){
      const classString = this.props.board.winner != 0 ? 'red' : '';
      return <button className={classString} onClick={this.props.restartGame}>Restart</button>
    }else{
      return <h2>Click on the board to start</h2>
    }
  }
  render(){
    let message = '';
    switch(this.props.board.winner){
      case -1:{
        message = "It's a tie!";
        break;
      }
      case 0:{
        message = "Let the better win";
        break;
      }
      case 1:{
        message = "You won!";
        break;
      }
      case 2:{
        message = "Computer won :(";
        break;
      }
    }
    if(!this.props.board.connected) message = "No server connection!";
    return (
      <div className="scoreboard">
        <h1>Tick Tack Toe</h1>
        <div className="message">{message}</div>
        {this.renderButton()}
      </div>
    );
  }
}

function mapStateToProps(state){
  return { board: state.board };
}

export default connect(mapStateToProps, actions)(Scoreboard);
