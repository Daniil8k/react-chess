import { FC, useCallback, useState } from "react";
import Chess from "utils/chess";
import BoardBackground from "./BoardBackground";
import { color, ICell } from "types/types";
import Cell from "./Cell";

const chess = new Chess();

interface IState {
	playerColor: color;
	board: ICell[];
	isCheck: boolean;
	isCheckmate: boolean;
}

const Board: FC = () => {
	const [state, setState] = useState<IState>({
		playerColor: "white",
		board: chess.board,
		isCheck: false,
		isCheckmate: false
	});

	const onTurn = useCallback((cell: ICell) => {
		if (cell.canMove || cell.isUnderAtack) {
			const [figure, color] = chess.move(cell.x, cell.y);
			console.log(figure, color);
		} else {
			chess.select(cell.x, cell.y);
		}

		setState({
			playerColor: chess.player,
			board: chess.board,
			isCheck: chess.isCheck,
			isCheckmate: chess.isCheckmate
		});
	}, []);

	return (
		<div>
			<div className="relative">
				{state.board.map((cell) => (
					<Cell
						key={cell.id}
						{...cell}
						playerColor={state.playerColor}
						onSelect={onTurn}
					/>
				))}
				<BoardBackground />
			</div>
		</div>
	);
};

export default Board;
