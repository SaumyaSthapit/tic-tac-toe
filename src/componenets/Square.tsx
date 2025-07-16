type SquareProps = {
    onClick: () => void;
    x?: number | null;
    o?: number | null;
};

const Square: React.FC<SquareProps> = ({ onClick, x, o }) => {
    const value = x ? "X" : o ? "O" : "";

    return (
        <>
            <div className={'square square-' + value} onClick={onClick}>
                {value}
            </div>
        </>
    );
};

export default Square;
