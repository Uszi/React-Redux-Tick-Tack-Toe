import { combineReducers } from 'redux';
import boardReducer from './board';

const rootReducer = combineReducers({
  board: boardReducer
});

export default rootReducer;
