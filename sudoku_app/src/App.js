import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SudokuTable from './components/sudoku_table/SudokuTable.js';
import NumbersPanel from './components/numbersPanel/NumbersPanel.js';
import {Provider}   from 'react-redux';
import {store} from './reduxStore.js';
import DifficultyPanel from './components/DifficultyPanel/difficulty.js';
import Timer from './components/Timer/index.js';

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <div className="App">
          <SudokuTable />
          <div className = 'main_panel'>
            <Timer />
            <DifficultyPanel />
            <NumbersPanel />
          </div>
        </div>
      </Provider>

    );
  }
}

export default App;
