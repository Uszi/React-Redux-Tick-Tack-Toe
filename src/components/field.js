import React, { Component } from 'react';

class Field extends Component{
  render(){
    const { pos, value, onClick } = this.props;
    const className = 'field ' + (value === 0 ? 'empty' : value === 1 ? 'p1' : 'p2');
    const val = (value === 0 ? '-' : value === 1 ? 'O' : 'X');
    return <div onClick={onClick} className={className}>{val}</div>;
  }
}

export default Field;
