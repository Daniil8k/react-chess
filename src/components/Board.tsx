import React, { FC, useCallback } from "react";
import BoardBackground from "./BoardBackground";
import { color, ICell } from "types/types";
import Cell from "./Cell";

interface BoardProps {
	playerColor: color;
	board: ICell[];
	isCheck: boolean;
	isCheckmate: boolean;
	onTurn: (cell: ICell) => void;
}

const Board: FC<BoardProps> = ({
	playerColor,
	isCheck,
	isCheckmate,
	board,
	onTurn
}) => {
	const canSelect = useCallback(
		(cell: ICell) => {
			let isCurrentPlayer = playerColor === cell.color;

			return (
				cell.canMove ||
				cell.isUnderAtack ||
				(isCurrentPlayer && !isCheck && !isCheckmate)
			);
		},
		[playerColor, isCheck, isCheckmate]
	);

	return (
		<div>
			<div className="relative">
				{board.map((cell) => (
					<Cell
						key={cell.id}
						{...cell}
						canSelect={canSelect}
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
