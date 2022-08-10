import { FC, useCallback } from "react";
import { color, ICell } from "types/types";
import Cell from "./Cell";

interface BoardProps {
	playerColor: color;
	board: ICell[];
	onTurn: (cell: ICell) => void;
}

const Board: FC<BoardProps> = ({ playerColor, board, onTurn }) => {
	const canSelect = useCallback(
		(cell: ICell) => {
			let isCurrentPlayer = playerColor === cell.color;

			return cell.canMove || cell.isUnderAtack || isCurrentPlayer;
		},
		[playerColor]
	);

	return (
		<div className="absolute w-full h-full">
			{board.map((cell) => (
				<Cell
					key={cell.id}
					{...cell}
					canSelect={canSelect}
					playerColor={playerColor}
					onSelect={onTurn}
				/>
			))}
		</div>
	);
};

export default Board;
