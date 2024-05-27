import { Winner_combs } from "../constants";

export const CheckWinnerFrom = (boardToCheck) => {
    for (const combo of Winner_combs) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  }

  export const checkEndGame = (newBoard)=>{
    return newBoard.every((Square)=>Square !== null);
  }
