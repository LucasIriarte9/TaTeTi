import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti';
import { Square } from './components/square';
import { Turns } from './constants';
import { CheckWinnerFrom, checkEndGame } from "./logic/board";
import { Winner } from './components/Winner';

function App() {
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  })
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage ?? Turns.X
  });
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(Turns.X);
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board]
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === Turns.X ? Turns.O : Turns.X;
    setTurn(newTurn);
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);
    const newWinner = CheckWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }

  }

  return (
    <main className='board'>
      <h1>Ta te ti</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className='game'>
        {
          board.map((square , index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === Turns.X}>{Turns.X}</Square>
        <Square isSelected={turn === Turns.O}>{Turns.O}</Square>
      </section>
        <Winner resetGame={resetGame} winner={winner}/>
    </main>

  )
}

export default App
