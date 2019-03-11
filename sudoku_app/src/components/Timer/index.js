import React, { Component } from 'react';
import './index.css';
import {connect}   from 'react-redux';
import { store } from '../../reduxStore.js';

let mapStateToProps = state => ({
  victory: state.vic.vic,
  newGame: state.diff.newGame,
})

class Timer extends Component {
  state = {
    min: 0,
    sec: 0,
  }
  componentDidMount (){
    this.startTime()
  }
  interval = null
  startTime = () => {
    this.interval = setInterval(() => {
      this.state.sec === 59 ? this.setState({ min: ++ this.state.min, sec: 0 })
        :this.setState({ sec: ++ this.state.sec })
    }, 1000);
  }
  stopTime = () => {
    clearInterval(this.interval)
    this.interval = null
    console.log(this.interval,"stop")
  }
  clearTime = () => {
    this.setState({min:0, sec:0})
  }
  pause = () => {
    this.interval ? this.stopTime() : this.startTime()
  }
  render(){
    let s = this.state
    if (this.props.victory){
      this.stopTime()
    }
    if (this.props.newGame){
      this.stopTime()
      this.clearTime()
      this.startTime()
    }
    return(
      <div className = 'time'>
        <div>
          {(s.min <=9 ? '0'+ s.min : s.min) + ' : ' + (s.sec <=9 ? '0'+ s.sec : s.sec)}
        </div>
        <div className = "pauseLogo" onClick = {this.pause}></div>
      </div>
    )
  }
}
Timer = connect (mapStateToProps,{})(Timer)
export default Timer
