import logo from './logo.svg';
import './App.css';
import './Board.css';
import { BoardCreate } from './Board.js';
import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();
let playerIdentifier = null;

function App() {
  
  console.log('\n\nAPPJS\n\n');
  useEffect(() => {
        socket.on('playerCount', (playerCount) => {
            console.log('Player count received!');
            console.log(playerCount);
            playerIdentifier = playerCount;
        });
    },[]);
  
  
  return (
      <div class={playerIdentifier}>
      <h1>{playerIdentifier}</h1>
      <BoardCreate />
      </div>
  );
}

export default App;
