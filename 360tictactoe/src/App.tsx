import  { useState } from 'react';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  isWinningSquare: boolean;
}

function Square({ value, onSquareClick, isWinningSquare }: SquareProps) {
  return (
    <button className={`square ${isWinningSquare ? 'winning' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
  winningLine: number[] | null;
}

function Board({ xIsNext, squares, onPlay, winningLine }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const renderSquare = (i: number, isWinningSquare: boolean) => (
    <Square
      key={i}
      value={squares[i]}
      onSquareClick={() => handleClick(i)}
      isWinningSquare={isWinningSquare}
    />
  );

  let status: string;
  const winner = calculateWinner(squares);
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(square => square !== null)) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div className="board-row" key={row}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              const isWinningSquare = winningLine ? winningLine.includes(index) : false;
              return renderSquare(index, isWinningSquare);
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState<{ squares: (string | null)[]; location: string }[]>([{
    squares: Array(9).fill(null),
    location: '', // Initialize with empty string
  }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), {
      squares: nextSquares,
      location: calculateLocation(nextSquares),
    }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function calculateLocation(squares: (string | null)[]): string {
    const index = squares.findIndex((square, index) => square !== history[currentMove].squares[index]);
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    return `(${row}, ${col})`;
  }
  let winningLine: number[] | null = null;
  const winner = calculateWinner(currentSquares);
  if (winner) {
    winningLine = calculateWinningLine(currentSquares);
  }
  let moves = history.map(({ location }, move) => {
    const description = move > 0 ? `Go to move #${move} (${location})` : 'Go to game start';
    if (move === currentMove) {
      return <li key={move}><strong>You are at move #{move}</strong></li>;
    } else {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
  });

  if (!isAscending) {
    moves = moves.reverse();
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setHistory(history.slice(0, nextMove + 1)); // Truncate history array
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} winningLine={winningLine} />
      </div>
      <div className="game-info">
        <button onClick={() => setIsAscending(!isAscending)}>
          {isAscending ? 'Sort Descending' : 'Sort Ascending'}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


function calculateWinner(squares: (string | null)[]) {
  const lines: number[][] = [
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
function calculateWinningLine(squares: (string | null)[]) {
  const lines: number[][] = [
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
      return lines[i];
    }
  }
  return null;
}
