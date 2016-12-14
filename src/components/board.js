import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import axios from 'axios';
import Field from './field';

class Board extends Component{
  constructor(props){
    super(props);

    this.initBoard();
  }
  initBoard(){
    const {size} = this.props;
    let _grid = [];
    for(let i=0; i<size; ++i){
      let row = [];
      for(let j=0; j<size; ++j){
        row.push(0);
      }
      _grid.push(row);
    }
    this.props.changeField(_grid);
  }
  handleClick({ x, y }){
    if(this.props.aiMove || !this.isValidMove(x, y) || this.props.board.winner != 0) return;
    let _grid = this.props.board.grid;
    _grid[x][y] = 1;
    this.props.changeField(_grid);
    this.props.changeAIMove(true);
    this.aiMove();
  }
  isValidMove(x, y){
    return this.props.board.grid[x][y] === 0;
  }
  aiMove(){
    axios.post('http://localhost:3000/', { grid: this.props.board.grid })
      .then((response) => {
        this.props.changeField(response.data.grid);
        this.props.changeAIMove(false);
        if(response.data.winner != 0){
          this.props.endGame(response.data.winner);
        }
      });
  }
  componentDidUpdate(){
    const { grid } = this.props.board;
    if(grid.length === 0) this.initBoard();
  }
  render(){
    const { grid } = this.props.board;

    const board = grid.map((row, x) => {
      const fields = row.map((field, y) => {
        return <Field
          onClick={this.handleClick.bind(this, {'x': x, 'y': y})}
          key={y}
          pos={{'x': x, 'y': y}}
          value={grid[x][y]} />;
      });
      return <div key={x} className="row">{ fields }</div>;
    });
    return (
      <div className="board">
        { board }
      </div>
    );
  }
}

function mapStateToProps(state){
  return { board: state.board };
}

export default connect(mapStateToProps, actions)(Board);
