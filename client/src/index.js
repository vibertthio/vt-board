import React from 'react';
import ReactDOM from 'react-dom';
import Board from './js/Board';
import './index.css';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider>
    <Board />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
