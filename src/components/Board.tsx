import { FC, useEffect, useRef, useState } from "react";
import Chess from "utils/chess";
import Cell from "components/Cell";
import Figure from "components/Figure";

const chess = new Chess();
console.log("test");

const Board: FC = () => {
	const [state, setState] = useState({
		player: "w",
		board: chess.board,
		isCheck: false,
		isCheckmate: false
	});

	const onTurn = () => {
		chess.setMoves();

		setState((state) => ({
			player: chess.player,
			board: chess.board,
			isCheck: chess.isCheck,
			isCheckmate: chess.isCheckmate
		}));
	};

	return (
		<div>
			<button onClick={onTurn}>test</button>
			<div className="relative">
				<div className="inline-grid grid-cols-8">
					{state.board.map((cell) => (
						<Cell key={`cell_${cell.x}_${cell.y}`} {...cell} />
					))}
				</div>
				{state.board.map((cell) => (
					<Figure key={`cell_${cell.x}_${cell.y}`} {...cell} />
				))}
			</div>
		</div>
	);
};

export default Board;
