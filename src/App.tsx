import { useState, useEffect } from "react";
import "./App.css";
import Board from "./componenets/Board";
import Square from "./componenets/Square";

const defaultSquares = () => new Array(9).fill(null);

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

function App() {
    const [squares, setSquares] = useState(defaultSquares());
    const [winner, setWinner] = useState("");

    useEffect(() => {
        const isComputerTurn =
            squares.filter((square) => square !== null).length % 2 === 1;

        const linesThatAre = (a: any, b: any, c: any): number[][] => {
            return lines.filter((squareIndexes) => {
                const squareValues = squareIndexes.map(
                    (index) => squares[index]
                );
                return (
                    JSON.stringify([a, b, c].sort()) ===
                    JSON.stringify(squareValues.sort())
                );
            });
        };

        const playerWon = linesThatAre("X", "X", "X").length > 0;
        const computerWon = linesThatAre("O", "O", "O").length > 0;

        if (playerWon) {
            setWinner("X");
            return;
        }

        if (computerWon) {
            setWinner("O");
            return;
        }

        const putComputerAt = (index: any) => {
            if (winner) return;

            let newSquares = [...squares];
            newSquares[index] = "O";
            setSquares(newSquares);
        };
        
        if (isComputerTurn) {
            // Check if game has finished
            const emptySquares = squares.filter(square => square == null)
            if (emptySquares.length === 0) return

            const winningLines = linesThatAre("O", "O", null);

            if (winningLines.length > 0) {
                const winIndex = winningLines[0].filter(
                    (index) => squares[index] === null
                )[0];
                putComputerAt(winIndex);
                return;
            }

            const linesToBlock = linesThatAre("X", "X", null);

            if (linesToBlock.length > 0) {
                const blockIndex = linesToBlock[0].filter(
                    (index) => squares[index] === null
                )[0];
                putComputerAt(blockIndex);
                return;
            }

            const linesToContinue = linesThatAre("O", null, null);

            if (linesToContinue.length > 0) {
                const continueIndex = linesToContinue[0].filter(
                    (index) => squares[index] === null
                )[0];
                putComputerAt(continueIndex);
                return;
            }

            const emptySpaces = squares
                .map((squares, index) => (squares === null ? index : null))
                .filter((val) => val !== null);

            const randomIndex =
                emptySpaces[Math.floor(Math.random() * emptySpaces.length)];

            putComputerAt(randomIndex);
            return;
        }
    }, [squares]);

    function handleSquareClick(index: number) {
        if (winner) return;

        const isPlayerTurn =
            squares.filter((square) => square !== null).length % 2 === 0;

        if (isPlayerTurn) {
            let newSquares = [...squares];
            newSquares[index] = "X";
            setSquares(newSquares);
        }
    }

    function handleReset() {
        setSquares(defaultSquares);
    }

    return (
        <>
            <main>
                <Board>
                    {squares.map((square, squareIndex) => (
                        <Square
                            x={square === "X" ? 1 : 0}
                            o={square === "O" ? 1 : 0}
                            onClick={() => handleSquareClick(squareIndex)}
                            key={squareIndex}
                        />
                    ))}
                </Board>
                {winner && (
                    <div style={{ textAlign: "center" }}>
                        {winner} won the game.
                        <button
                            style={{ marginLeft: "10px" }}
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </div>
                )}
            </main>
        </>
    );
}

export default App;
