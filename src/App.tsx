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
    const [winningSquares, setWinningSquares] = useState(
        new Array(3).fill(null),
    );
    const [winningLineClass, setWinningLineClass] = useState("");
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const isGameOver =
            squares.filter((square) => square === null).length < 1;

        if (isGameOver) {
            setGameOver(true)
        }

        const isComputerTurn =
            squares.filter((square) => square !== null).length % 2 === 1;

        const linesThatAre = (a: any, b: any, c: any): Array<any> => {
            return lines.filter((squareIndexes) => {
                const squareValues = squareIndexes.map(
                    (index) => squares[index],
                );
                return (
                    JSON.stringify([a, b, c].sort()) ===
                    JSON.stringify(squareValues.sort())
                );
            });
        };

        const playerWon = linesThatAre("X", "X", "X");
        const computerWon = linesThatAre("O", "O", "O");

        const declareWinner = (winner: string, winningSquares: Array<any>) => {
            setWinner(winner);
            setWinningSquares(winningSquares[0]);

            const lineIndex = lines.indexOf(winningSquares[0]);

            if (lineIndex === 6) {
                setWinningLineClass("top-to-bottom");
            } else if (lineIndex === 7) {
                setWinningLineClass("bottom-to-top");
            } else if (lineIndex < 3) {
                setWinningLineClass("horizontal");
            } else {
                setWinningLineClass("vertical");
            }

            setGameOver(true)
        };

        if (playerWon.length > 0) {
            declareWinner("X", playerWon);
            return;
        }

        if (computerWon.length > 0) {
            declareWinner("O", computerWon);
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
            const emptySquares = squares.filter((square) => square == null);
            if (emptySquares.length === 0) return;

            const winningLines = linesThatAre("O", "O", null);

            if (winningLines.length > 0) {
                const winIndex = winningLines[0].filter(
                    (index: string | number) => squares[index] === null,
                )[0];
                putComputerAt(winIndex);
                return;
            }

            const linesToBlock = linesThatAre("X", "X", null);

            if (linesToBlock.length > 0) {
                const blockIndex = linesToBlock[0].filter(
                    (index: string | number) => squares[index] === null,
                )[0];
                putComputerAt(blockIndex);
                return;
            }

            const linesToContinue = linesThatAre("O", null, null);

            if (linesToContinue.length > 0) {
                const continueIndex = linesToContinue[0].filter(
                    (index: string | number) => squares[index] === null,
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
            // Check if the square has already been clicked
            if (squares[index] !== null) return;

            let newSquares = [...squares];
            newSquares[index] = "X";
            setSquares(newSquares);
        }
    }

    function handleReset() {
        setGameOver(false)
        setSquares(defaultSquares);
        setWinner("");
        setWinningLineClass("");
    }

    return (
        <>
            <main>
                <Board>
                    {squares.map((square, squareIndex) => (
                        <Square
                            x={square === "X" ? 1 : 0}
                            o={square === "O" ? 1 : 0}
                            squareIndex={squareIndex}
                            winningSquares={winningSquares}
                            winningLineClass={winningLineClass}
                            onClick={() => handleSquareClick(squareIndex)}
                            key={squareIndex}
                        />
                    ))}
                </Board>
                {gameOver && (
                    <div style={{ textAlign: "center", paddingTop: "1.5rem" }}>
                        {/* {winner && (<h4>{winner} won the game.</h4>)} */}
                        <button
                            className="next-btn"
                            style={{ marginLeft: "10px" }}
                            onClick={handleReset}
                        >
                            NEXT GAME
                        </button>
                    </div>
                )}
            </main>
        </>
    );
}

export default App;
