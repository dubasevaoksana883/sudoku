import {createStore, combineReducers} from 'redux';

let numReducer = (state, action)=>{
  if (state === undefined)return{curentNumber:0}
  if (action.type === 'ADD_CURENT_NUMBER')return {curentNumber:action.num}
  return state
}
let difficultyReducer = (state, action)=>{
  if ( state === undefined )
    return { diff:[1,2], newGame: false}
  if ( action.type === 'SET_DIFFICULTY' )
    return { diff: action.arr, newGame: false }
   if ( action.type === 'TOGGLE_GAME' ){
     console.log(state.newGame,"newGame")
    return { ...state, newGame: !state.newGame }
  }
  return state
}
let checkBtnReducer = (state = {checkMode: false}, action) => {
  if ( action.type === 'TOGGLE_CHECK_MODE')
    return { checkMode: !state.checkMode }
  return state
}
let victoryReducer = ( state = {vic: false, arrFlag: []}, action) => {
  if ( action.type === 'ADD_FLAG' ){
    let arr = [...state.arrFlag]
    arr.push(action.flag)
    let victory = false
    if (arr.length === 81){
      victory = !arr.some(el => !el)
    }
    console.log(victory,"vic")
    return {vic: victory, arrFlag: arr}
  }
  if ( action.type === 'CLEAR_FLAG' ){
      console.log(state.vic)
    return {vic: false, arrFlag: []}}
  return state
}
let counterCell = ( state = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}, action ) => {
  if ( action.type === 'COUNT_CELL' ){
    let newState = Object.assign({},state)
    newState [action.num]++
    return newState
  }
  if ( action.type === 'CLEAR_CELL' )
    return {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}
  return state
}

const reducers = combineReducers({
  num: numReducer,
  diff: difficultyReducer,
  togBtn: checkBtnReducer,
  vic: victoryReducer,
  cell: counterCell,
})
const store = createStore(reducers)

let setDiff = arr => ({type: 'SET_DIFFICULTY', arr: arr})
let adNum = num => ({type: 'ADD_CURENT_NUMBER', num: num})
let togGame = () => ({type: 'TOGGLE_GAME'})
let toggleBtn = () => ({type: 'TOGGLE_CHECK_MODE'})
let addFlag = flag => ({type: 'ADD_FLAG', flag: flag})
let clearFlag = () => ({type: 'CLEAR_FLAG'})
let clearCell = () => ({type: 'CLEAR_CELL'})
let countCell = num => ({type: 'COUNT_CELL', num: num})


export {store, adNum, setDiff, togGame, toggleBtn, addFlag, clearFlag, clearCell, countCell}
