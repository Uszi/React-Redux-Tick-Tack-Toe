import { CHANGE_FIELD, CHANGE_AI_MOVE, END_GAME, RESTART_GAME, CHECK_CONNECTION } from '../actions/types';

const INITIAL_STATE = {
  grid: [],
  aiMove: false,
  aiMessage: '',
  winner: 0,
  connected: true
}

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case CHANGE_FIELD:
            return {...state, grid: action.payload};
        case CHANGE_AI_MOVE:
            return {...state, aiMove: action.payload};
        case END_GAME:
            return {...state, winner: action.payload};
        case RESTART_GAME:
            return INITIAL_STATE;
        case CHECK_CONNECTION:
            return {...state, connected: action.payload};
    }
    return state;
}
