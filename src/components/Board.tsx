import { FC, useState } from "react";
import Chess from "utils/chess";
import Figure from "components/Figure";
import BoardBackground from "./BoardBackground";

const chess = new Chess();

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
				{state.board.map((cell) => (
					<Figure key={`cell_${cell.x}_${cell.y}`} {...cell} />
				))}
				<BoardBackground />
			</div>
		</div>
	);
};

export default Board;
