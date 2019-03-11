import React, { Component } from 'react';

import {generateSudoku,disabledNumLine} from "./generator.js";

import "./sudoku_table.css"
import { store, togGame, toggleBtn, addFlag, clearFlag, clearCell, countCell } from '../../reduxStore.js';
import {connect}   from 'react-redux';

let mapStateToProps = state => ({
  curentNum: state.num.curentNumber,
  curentDiff: state.diff.diff,
  newGame: state.diff.newGame,
  checkMode: state.togBtn.checkMode,
  victory: state.vic.vic,
})

let Cell = props => {
  return (
    <div className= "cell" onClick = {props.click}
      style = {{backgroundColor: props.initial ? "#d6e4f9bf" : props.flag ? '#ffffff80' : '#ef818e80' }}>
      {props.num}
    </div>
  )
}

let copy = obj => JSON.parse(JSON.stringify(obj))

class SudokuTable extends Component {
  state = {
    matrix: generateSudoku(),
  }
  disabledMatrix = null

  funcDisabledMatrix = (param) => {

    let disMat = param ? disabledNumLine (generateSudoku(), ...this.props.curentDiff)
    : disabledNumLine (this.state.matrix, ...this.props.curentDiff)
    this.disabledMatrix = disMat
    this.setState({matrix: disMat})
    console.error("fig")
  }

  clickHandle = (x, y, init) => {
    return event => {
      if (!init){
        let newMat = copy(this.state.matrix)
        newMat[x][y] = this.props.curentNum
        this.setState({matrix:newMat})
      }
    }
  }
  // startChecking = event => {
  //   this.props.toggleBtn()
  //   this.setState({matrix:copy(this.state.matrix)})
  // }
  checkMatrix = (x, y, num) => {
    let checkLine = () => !this.state.matrix[x]
      .some((el, ind) => ind === y ? false : el === num )
    let checkColumn = () =>  !this.state.matrix
      .some((line, ind) => ind ===x ? false : line[y] === num )
    return (checkLine() && checkColumn())
  }

  componentDidMount(){
    this.funcDisabledMatrix()
  }
  startNewGame = (stateGame) => {
    if (!stateGame) return
    this.props.togGame()
    this.funcDisabledMatrix( true )
    console.log(2, this.state)
  }
  count = 0

  render(){
    console.log(this.props.curentNum)
    console.log(this.disabledMatrix,"dismat")
    this.startNewGame(this.props.newGame)
    this.props.clearFlag()
    this.props.clearCell()

    return(
      <div className = "mainDiv">
        <div className = 'victory' style = {{
          display: this.props.victory ? "block" : "none"
        }}>
        <h1 className="vin">Отлично</h1>
        </div>
        <div className = 'box'>
          {this.state.matrix.map((line,indLine)=>{
            return (
              <div key={indLine} className = "line">
                {line.map((el, indColumn)=>{
                  if (this.count++ === 0){
                    this.props.addFlag(false)
                  }
                  let flag = this.checkMatrix(indLine,indColumn, el) && el
                  this.props.addFlag(flag)
                  if (el) this.props.countCell(el)
                  let initial = this.disabledMatrix ? this.disabledMatrix[indLine][indColumn] !== 0
                    : false
                  return (
                    <Cell key={indColumn} num = {!el?" ": el}
                     click = {this.clickHandle(indLine,indColumn,initial)}
                     flag = {this.props.checkMode ? flag : true}
                     initial = {initial}/>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
SudokuTable = connect (mapStateToProps,{togGame, toggleBtn, addFlag, clearFlag, clearCell, countCell})(SudokuTable)
export default SudokuTable
