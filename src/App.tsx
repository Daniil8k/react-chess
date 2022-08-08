import Board from "components/Board";
import BoardHeader from "components/BoardHeader";
import ScoreBoard from "components/ScoreBoard";
import { FC, useCallback, useState } from "react";
import { captureFigure, color, ICell } from "types/types";
import Chess from "utils/chess";

interface IChessState {
	playerColor: color;
	board: ICell[];
	isCheck: boolean;
	isCheckmate: boolean;
	capturedFiguresMap: {
		[key in color]: {
			[key in captureFigure]: number;
		};
	};
}

const chess = new Chess();

const App: FC = () => {
	const [state, setState] = useState<IChessState>({
		playerColor: chess.playerColor,
		board: chess.board,
		isCheck: chess.isCheck,
		isCheckmate: chess.isCheckmate,
		capturedFiguresMap: chess.capturedFiguresMap
	});

	const onTurn = useCallback((cell: ICell) => {
		if (cell.canMove || cell.isUnderAtack) {
			chess.move(cell.x, cell.y);
		} else {
			chess.select(cell.x, cell.y);
		}

		setState({
			playerColor: chess.playerColor,
			board: chess.board,
			isCheck: chess.isCheck,
			isCheckmate: chess.isCheckmate,
			capturedFiguresMap: chess.capturedFiguresMap
		});
	}, []);

	return (
		<div>
			<div className="flex gap-1 w-fit mx-auto text-center text-xl bold mb-2">
				<span className="text-yellow-500">Warning!</span>
				<span>Still in development...</span>
			</div>
			<div className="w-fit flex gap-2 items-center justify-center flex-wrap">
				<div className="w-fit">
					<BoardHeader
						playerColor={state.playerColor}
						isCheck={state.isCheck}
						isCheckmate={state.isCheckmate}
					/>
					<Board
						isCheck={state.isCheck}
						isCheckmate={state.isCheckmate}
						playerColor={state.playerColor}
						board={state.board}
						onTurn={onTurn}
					/>
				</div>
				<ScoreBoard capturedFiguresMap={state.capturedFiguresMap} />
			</div>
		</div>
	);
};

export default App;
