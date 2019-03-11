import React, { useState } from 'react';
import {connect}   from 'react-redux';
import './difficulty.css';
import {setDiff, store, togGame} from '../../reduxStore.js'

const mapStateToProps = state  => ({diff: state.diff.diff})

let DifficultyPanel = props => {
  const [menu, setMenu] = useState(false);

  let checkMenu = [
    ["Легкая", [1,2]],
    ["Средняя", [5,7]],
    ["Сложная", [6,7]]
  ]

  return (
    <div className = "menu">
      <div className = "menu_btn" onClick={() => setMenu(!menu)}>
        Новая игра
      </div>
      <div className = "menu_diff" style = {{display: menu ? "block" : "none" }}>
        <div className = 'triangle'></div>
          <ul>
            {checkMenu.map((el, ind) => <li key={ind} onClick = {event=>{
              setMenu(!menu)
              props.setDiff(el[1])
              props.togGame()
            }}>{el[0]}</li>)}
          </ul>
      </div>
    </div>
  );
}
DifficultyPanel = connect(mapStateToProps, {setDiff, togGame})(DifficultyPanel)

export default DifficultyPanel
