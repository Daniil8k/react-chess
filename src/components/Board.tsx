import { FC, useCallback } from "react";
import { color, ICell } from "types/types";
import Cell from "./Cell";

interface BoardProps {
	playerColor: color;
	board: ICell[];
	onTurn: (cell: ICell) => void;
}

const Board: FC<BoardProps> = ({ playerColor, board, onTurn }) => {
	return (
		<div className="absolute w-full h-full">
			{board.map((cell) => (
				<Cell
					key={cell.id}
					{...cell}
					playerColor={playerColor}
					onSelect={onTurn}
				/>
			))}
		</div>
	);
};

export default Board;
