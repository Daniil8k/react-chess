import { FC, useState } from "react";
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

	const onTurn = () => {
		chess.setMoves();

		setState((state) => ({
			playerColor: chess.player,
			board: chess.board,
			isCheck: chess.isCheck,
			isCheckmate: chess.isCheckmate
		}));
	};

	return (
		<div>
			<button onClick={onTurn}>{state.playerColor}</button>
			<div className="relative">
				{state.board.map((cell) => (
					<Cell
						key={`cell_${cell.x}_${cell.y}`}
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
