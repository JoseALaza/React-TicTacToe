import React, { useState, useRef, useEffect } from 'react'
import { Square } from './Square.js';
import io from 'socket.io-client';

const socket = io();

export function BoardCreate() {

    const boardBase = ['', '', '', '', '', '', '', '', ''];
    const [board, setBoard] = useState(boardBase);
    const [player, setPlayer] = useState(0); // 0 or 1 for whos gonna go 0->X and 1->O

    console.log('Create:  ', board)

    function playerChange(ply) {
        if (ply == 1) {
            setPlayer(0);
            return 'O';
        }
        else if (ply == 0) {
            setPlayer(1);
            return 'X';
        }
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }


    function onClickSquare(a) {
        let boardCopy = JSON.parse(JSON.stringify(board))
        if (calculateWinner(boardCopy) || boardCopy[a.target.id]) {
            return;
        }
        boardCopy[a.target.id] = playerChange(player);
        setBoard(prevBoard => boardCopy);
        socket.emit('player', { 'Player': player, 'Position': parseInt(a.target.id) });
    }

    useEffect(() => {
        socket.on('player', (data) => {
            console.log('Player details received!');
            console.log(data, board);
            let boardCopy = JSON.parse(JSON.stringify(board))
            if (calculateWinner(boardCopy) || boardCopy[data.Position]) {
                return;
            }
            boardCopy[data.Position] = playerChange(player);
            setBoard(boardCopy);
        });
    }, [board]);


    console.log('    END      ', board);

    const winner = calculateWinner(board);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    }
    else {
        status = 'Next player: ' + (player?'O':'X');
    }


    return (
        <div>
        <h1>{status}</h1>
        <div class = "board" > { board.map((item, val) => <Square idx={val} val={item} onClick={onClickSquare}/>) } </div>
        </div>

    );
}
