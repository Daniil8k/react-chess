import Board, { IBoardState } from "components/Board";
import ScoreBoard from "components/ScoreBoard";
import { useState } from "react";

function App() {
	const [state, setState] = useState<IBoardState>({
		playerColor: "white",
		isCheck: false,
		isCheckmate: false,
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
		}
	});

	return (
		<div className="min-h-screen flex gap-2 items-center justify-center">
			<main className="w-fit">
				<header className="flex items-center justify-between mb-2">
					<span>
						Move: <span className="font-bold">{state.playerColor}</span>
					</span>
					<span
						style={{ opacity: state.isCheck ? 1 : 0 }}
						className="text-red-500"
					>
						Check
					</span>
				</header>
				<Board state={state} setState={setState} />
			</main>
			<aside>
				<ScoreBoard
					className="mb-3"
					playerColor="white"
					caputeredFigures={state.capturedFiguresMap.white}
				/>
				<ScoreBoard
					playerColor="black"
					caputeredFigures={state.capturedFiguresMap.black}
				/>
			</aside>
		</div>
	);
}

export default App;
