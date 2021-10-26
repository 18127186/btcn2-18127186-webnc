import React, { useState } from "react";
import Board from "../Board";
const boardSize = 10;
const conditionToWin = 5; // if change it, need change line 46 and condition at 47 
function calculateWinner(squares) {
  const lines = [];
  for (let row = 0; row < boardSize; row++){
    for (let column = 0; column < boardSize; column++) {
      let selectLineRow = [];
      let selectLineColumn = [];
      let selectLineCrossRow = [];
      let selectLineCrossRow2 = [];
      let select = row * boardSize + column;
      for (let i = 0; i < conditionToWin; i++) {
        if (select + i < boardSize*boardSize &&  Math.floor((select+i)/boardSize) === row) {
          selectLineRow.push(select + i);
        }
        if (select + i*boardSize < boardSize*boardSize) {
          selectLineColumn.push(select + i*boardSize);
        }
        if (select + i + i*boardSize < boardSize*boardSize && Math.floor((select + i + i*boardSize)/boardSize) - row === i) {
          selectLineCrossRow.push(select + i + i*boardSize);
        }
        if (select - i + i*boardSize  < boardSize*boardSize &&  Math.floor((select - i + i*boardSize)/boardSize) - row === i) {
          selectLineCrossRow2.push(select - i + i*boardSize);
        }
      }
      if (selectLineRow.length === conditionToWin) {
        lines.push(selectLineRow);
      }
      if (selectLineColumn.length === conditionToWin) {
        lines.push(selectLineColumn);
      }
      if (selectLineCrossRow.length === conditionToWin) {
        lines.push(selectLineCrossRow);
      }
      if (selectLineCrossRow2.length === conditionToWin) {
        lines.push(selectLineCrossRow2);
      }
    }
  }
  console.log(lines);
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i]; // conditionToWin = 5
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]  && squares[a] === squares[d]  && squares[a] === squares[e]) {
      return { 
        winner: squares[a],
        line: lines[i]
      };
    }
  }
  let statusGame = 'draw';
  for (let i = 0; i< squares.length; i++) {
    if (squares[i] === null) {
      statusGame = 'continue';
      break;
    }
  }
  return { 
    winner: null,
    line: null,
    statusGame: statusGame
  };
}

const Game = (props) => {
    const [history, setHistory] = useState([
        {
            squares: Array(boardSize*boardSize).fill(null),
            latestMove: 0
        }
    ]);
    const [stepNumber, setStepNumber] = useState (0);
    const [xIsNext, setXIsNext] = useState (true);
    const [isDescending, setIsDescending] = useState (true);
    const handleToggleSort = () => {
        setIsDescending(!isDescending);
    }
    const handleClick = (i) => {
      const newHistory = history.slice(0, stepNumber + 1);
      const current = newHistory[newHistory.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares).winner || squares[i]) {
        return;
      }
      squares[i] = xIsNext ? 'X' : 'O';
      setHistory(
        newHistory.concat([{
        squares: squares,
        latestMove: i
      }]));
      setStepNumber(newHistory.length);
      setXIsNext(!xIsNext);
    }
    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }
    const current = history[stepNumber];
    const infoGame = calculateWinner(current.squares);
    const winner = infoGame.winner;
    const statusGame = infoGame.statusGame;
      
    const moves = history.map((step, move) => {
        const latestMove = step.latestMove;
        const col = 1 + latestMove % boardSize;
        const row = 1 + Math.floor(latestMove / boardSize);
        const desc = move ?
          'Go to move #' + move + '(' + col + ',' + row + ')':
          'Go to game start';
        return (
          <li key={move} className={move === stepNumber ? 'select' : ''}>
            <button className={move === stepNumber ? 'selectButton' : ''} onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
    });
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else if (statusGame === 'draw') {
        status = 'Draw Game'
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
    if (!isDescending) {
        moves.reverse();
    }
    return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => handleClick(i)}
              lineWin = {infoGame.line}
              boardSize = {boardSize}
            />
          </div>
          <div className="game-info">
            <div className={(statusGame === 'draw' ? 'highlight' : '')}>{status}</div>
            <button onClick={() => handleToggleSort()}>
              {isDescending ? 'Sort Ascending' : 'Sort Descending'}
            </button>
            <ol>{moves}</ol>
          </div>
        </div>
      );
  }
export default Game