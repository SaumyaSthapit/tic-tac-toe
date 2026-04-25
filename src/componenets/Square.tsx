type SquareProps = {
    onClick: () => void;
    x?: number | null;
    o?: number | null;
    squareIndex: number;
    winningSquares: Array<number>;
    winningLineClass?: string | ''
};

const Square: React.FC<SquareProps> = ({ onClick, x, o, squareIndex, winningSquares, winningLineClass }) => {
    const value = x ? "X" : o ? "O" : "";

    return (
        <>
            <div className={`square square-${value} square-${squareIndex}`} onClick={onClick}>
                {winningSquares.includes(squareIndex) && (<div className={`winning-line ${winningLineClass}`}></div>)}
                {value}
            </div>
        </>
    );
};

export default Square;
