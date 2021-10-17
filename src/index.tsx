import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { DndProvider } from "react-dnd"
// import { HTML5Backend } from 'react-dnd-html5-backend'
import backend from 'react-dnd-html5-backend'
import { AppStateProvider } from './AppStateContext'

ReactDOM.render(
  <DndProvider backend={backend}>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </DndProvider>
  , document.getElementById('root'));