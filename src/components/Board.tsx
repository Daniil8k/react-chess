import React, { FC } from "react";
import BoardBackground from "./BoardBackground";
import { color, ICell } from "types/types";
import Cell from "./Cell";

interface BoardProps {
	playerColor: color;
	board: ICell[];
	onTurn: (cell: ICell) => void;
}

const Board: FC<BoardProps> = ({ playerColor, board, onTurn }) => {
	return (
		<div>
			<div className="relative">
				{board.map((cell) => (
					<Cell
						key={cell.id}
						{...cell}
						playerColor={playerColor}
						onSelect={onTurn}
					/>
				))}
				<BoardBackground />
			</div>
		</div>
	);
};

export default Board;
