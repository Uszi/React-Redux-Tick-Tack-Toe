import { CHANGE_FIELD, CHANGE_AI_MOVE, END_GAME, RESTART_GAME, CHECK_CONNECTION } from './types';

export function changeField(grid){
  return {
      type: CHANGE_FIELD,
      payload: grid
  }
}
export function changeAIMove(aiMove){
  return {
    type: CHANGE_AI_MOVE,
    payload: aiMove
  }
}
export function endGame(winner){
  return {
    type: END_GAME,
    payload: winner
  }
}
export function restartGame(){
  return {
    type: RESTART_GAME
  }
}
export function connection(isConnected){
  return {
    type: CHECK_CONNECTION,
    payload: isConnected
  }
}
