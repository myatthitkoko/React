//This page is developed based on the tutorial provided by react.dv
//https://react.dev/learn/tutorial-tic-tac-toe

import {useState} from 'react';

function Square({value, onSquareClick, isWinner}) {
  return (
  <button 
    className={isWinner ? "square winner" : "square"}
    onClick={onSquareClick}
  >
    {value}
  </button>
  );
}

function declareWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
  ];
  for (let i=0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
      return ( 
        {
          winner: squares[a],
          line: [a,b,c]
        }
      );
    }
  }

  return null;
}

function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i) {
    if (squares[i] || declareWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const result = declareWinner(squares);
  const winner = result?.winner;
  const winnerLine = result?.line || [];
  let status;
  if (winner) {
    status = "Winner: " +  winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinner={winnerLine.includes(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinner={winnerLine.includes(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinner={winnerLine.includes(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinner={winnerLine.includes(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinner={winnerLine.includes(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinner={winnerLine.includes(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinner={winnerLine.includes(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinner={winnerLine.includes(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinner={winnerLine.includes(8)}/>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    if ((nextMove > 9) || (nextMove < 0) || (nextMove > history.length-1)) {
      return;
    }
    setCurrentMove(nextMove);
  }

  console.log(history.length)

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="footer">
        <button className={currentMove-1 < 0 ? "impossible" : "possible"} onClick={() => jumpTo(currentMove-1)}>{'<'}</button>
        <button className={history.length <= 1 ? "impossible" : "possible restart"} onClick={() => jumpTo(0)}>RESTART ↻</button>
        <button className={currentMove+1 > history.length-1  ? "impossible" : "possible"} onClick={() => jumpTo(currentMove+1)}>{'>'}</button>
      </div>
    </div>
  );
}