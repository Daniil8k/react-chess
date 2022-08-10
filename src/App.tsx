import BoardBackground from "components/BoardBackground";
import BoardHeader from "components/BoardHeader";
import ScoreBoard from "components/ScoreBoard";
import React, { FC, useCallback, useState } from "react";
import { ICell } from "types/types";
import { IChess, IChessState } from "utils/chess";
const Board = React.lazy(() => import("components/Board"));

let chess: IChess = {
	board: [],
	isCheck: false,
	isCheckmate: false,
	playerColor: "white",
	capturedFiguresMap: {
		white: {
			queen: 0,
			knight: 0,
			rook: 0,
			bishop: 0,
			pawn: 0
		},
		black: {
			queen: 0,
			knight: 0,
			rook: 0,
			bishop: 0,
			pawn: 0
		}
	},
	move: (x, y) => {},
	select: (x, y) => {}
};

import("utils/chess").then((Chess) => {
	chess = new Chess.default();
});

const App: FC = () => {
	const [state, setState] = useState<IChessState>({
		playerColor: chess.playerColor,
		board: chess.board,
		isCheck: chess.isCheck,
		isCheckmate: chess.isCheckmate,
		capturedFiguresMap: chess.capturedFiguresMap
	});

	const showCheckmateAlert = () => {
		if (chess.isCheckmate) {
			setTimeout(() => {
				let winColor = chess.playerColor === "white" ? "black" : "white";
				alert(`${winColor} win!`);
				window.location.reload();
			});
		}
	};

	const onTurn = useCallback((cell: ICell) => {
		if (cell.canMove || cell.isUnderAtack) {
			chess.move(cell.x, cell.y);
		} else {
			chess.select(cell.x, cell.y);
		}

		showCheckmateAlert();
		setState({
			playerColor: chess.playerColor,
			board: chess.board,
			isCheck: chess.isCheck,
			isCheckmate: chess.isCheckmate,
			capturedFiguresMap: chess.capturedFiguresMap
		});
	}, []);

	return (
		<div className="w-fit flex gap-2 items-center justify-center flex-wrap">
			<div className="w-fit">
				<BoardHeader
					playerColor={state.playerColor}
					isCheck={state.isCheck}
					isCheckmate={state.isCheckmate}
				/>
				<div className="relative">
					<Board
						playerColor={state.playerColor}
						board={state.board}
						onTurn={onTurn}
					/>
					<BoardBackground />
				</div>
			</div>
			<ScoreBoard capturedFiguresMap={state.capturedFiguresMap} />
		</div>
	);
};

export default App;
