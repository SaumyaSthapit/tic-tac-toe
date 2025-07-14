import React, { type ReactNode } from "react";

type BoardProps = {
    children: ReactNode;
};

const Board: React.FC<BoardProps> = ({ children }) => {
    return (
        <>
            <div className="board">{children}</div>
        </>
    );
};

export default Board;
