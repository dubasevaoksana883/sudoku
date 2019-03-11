import React, { Component } from 'react';
import './panel.css';
import { store, adNum, toggleBtn } from '../../reduxStore.js';
import {connect}   from 'react-redux';

let mapStateToProps = state => ({curentNum: state.curentNum, cellPanel: state.cell})

// store.subscribe(()=>console.log(store.getState()));
class NumbersPanel extends Component {
  state = {
    panel: [
      [1,2,3],
      [4,5,6],
      [7,8,9],
      [0]
    ],
    curentNum: 0
  }
  choiceNum = number => {
    return event => {
      this.props.adNum(number)
      this.setState({
        panel: JSON.parse(JSON.stringify(this.state.panel)),
        curentNum: number,
      })
    }
  }
  render (){
    return (
      <div className = "panel">
        {this.state.panel.map((line, ind) => {
          return (
            <div key={ind} className = "panel_line">
              {line.map(num=>{
                let cells = this.props.cellPanel[num] === 9
                return (
                  <div key={num} className = "numbtn" onClick = {this.choiceNum(num)}
                  style = {{backgroundColor: num===this.state.curentNum ? '#79f78580' : cells ? '#d6e4f990' : null}}>
                    {!num ? ' ' : num}
                  </div>
                )
              })}
            </div>
          )
        })
      }
      <label className = "checkbox">
        <input type = "checkbox" onClick = {event => {this.props.toggleBtn()}} />
        <div className = "checkbox__text">Проверка</div>
      </label>
      </div>
    )
  }
}
NumbersPanel = connect(mapStateToProps,{adNum, toggleBtn})(NumbersPanel)

export default NumbersPanel
