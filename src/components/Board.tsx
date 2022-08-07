import React, {
	Dispatch,
	FC,
	SetStateAction,
	useCallback,
	useEffect,
	useState
} from "react";
import Chess from "utils/chess";
import BoardBackground from "./BoardBackground";
import { captureFigure, color, EShortColor, figure, ICell } from "types/types";
import Cell from "./Cell";

const chess = new Chess();

export interface IBoardState {
	playerColor: color;
	isCheck: boolean;
	isCheckmate: boolean;
	capturedFiguresMap: {
		[key in color]: {
			[key in captureFigure]: number;
		};
	};
}
interface BoardProps {
	state: IBoardState;
	setState: Dispatch<SetStateAction<IBoardState>>;
	onTakeFigure?: (figure: figure, color: color) => void;
}

const Board: FC<BoardProps> = ({ state, setState, onTakeFigure }) => {
	const [board, setBoard] = useState<ICell[]>(chess.board);

	const onTurn = useCallback((cell: ICell) => {
		if (cell.canMove || cell.isUnderAtack) {
			chess.move(cell.x, cell.y);
		} else {
			chess.select(cell.x, cell.y);
		}

		setBoard(chess.board);
		setState({
			playerColor: chess.playerColor,
			isCheck: chess.isCheck,
			isCheckmate: chess.isCheckmate,
			capturedFiguresMap: chess.capturedFiguresMap
		});
	}, []);

	return (
		<div>
			<div className="relative">
				{board.map((cell) => (
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

export default React.memo(Board);
