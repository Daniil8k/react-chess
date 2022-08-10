import {
	color,
	EShortColor,
	EShortFigureName,
	ICell,
	figure,
	captureFigure
} from "types/types";
import {
	filterMovesByKing,
	getCell,
	getDeepCopy,
	getPossibleMoves,
	getSelectedCell,
	isKingUnderAtack,
	markBoardCells,
	moveFigure
} from "./helpers";

const EMPTY_CELL = "..";
const DEFAULT_BOARD_TEMPLATE = `
    wr wh wb wq wk wb wh wr
    wp wp wp wp wp wp wp wp
    .. .. .. .. .. .. .. ..
    .. .. .. .. .. .. .. ..
    .. .. .. .. .. .. .. ..
    .. .. .. .. .. .. .. ..
    bp bp bp bp bp bp bp bp
    br bh bb bq bk bb bh br
`;
const SIZE = 8;

export interface IChessState {
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

export interface IChess extends IChessState {
	move: (x: number, y: number) => void;
	select: (x: number, y: number) => void;
}

export default class Chess implements IChess {
	private _playerColor: color;
	private _isCheck: boolean;
	private _isCheckmate: boolean;
	private _board: ICell[];
	private _capturedFiguresMap: {
		[key in color]: {
			[key in captureFigure]: number;
		};
	};

	constructor() {
		this._playerColor = "white";
		this._isCheck = false;
		this._isCheckmate = false;
		this._board = this._getDefaultBoard();
		this._capturedFiguresMap = {
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
		};
	}

	get board() {
		return getDeepCopy(this._board);
	}

	get isCheck() {
		return this._isCheck;
	}

	get isCheckmate() {
		return this._isCheckmate;
	}

	get playerColor() {
		return this._playerColor;
	}

	get capturedFiguresMap() {
		return getDeepCopy(this._capturedFiguresMap);
	}

	private _getDefaultBoard() {
		let board: ICell[] = [];
		let templateArr = DEFAULT_BOARD_TEMPLATE.split(/[\s]/).filter((i) => i);

		templateArr.forEach((str, index) => {
			let y = Math.trunc(index / SIZE);
			let x = index % SIZE;

			let cell = {
				id: `cell_${y}_${x}`,
				x,
				y,
				figure: null,
				color: null,
				isSelected: false,
				isUnderAtack: false,
				canMove: false
			} as ICell;

			if (str !== EMPTY_CELL) {
				const [color, figure] = str.split("");

				cell.figure = EShortFigureName[figure as keyof typeof EShortFigureName];
				cell.color = EShortColor[color as keyof typeof EShortColor];
			}

			board.push(cell);
		});

		return board;
	}

	private _captureFigure(figure: figure | null, color: color | null) {
		if (figure && figure !== "king" && color) {
			let winColor: color = color === "white" ? "black" : "white";
			this._capturedFiguresMap[winColor][figure as captureFigure] += 1;
		}
	}

	private _changePlayer() {
		this._playerColor = this._playerColor === "white" ? "black" : "white";
	}

	private _clearBoard() {
		this._board.forEach((cell) => {
			cell.canMove = false;
			cell.isUnderAtack = false;
			cell.isSelected = false;
		});
	}

	private _updateBoard(newBoard: ICell[]) {
		this._board.length = 0;
		this._board = getDeepCopy(newBoard);
	}

	public select(x: number, y: number, noClear = false) {
		!noClear && this._clearBoard();
		let selectedCell = getCell(this._board, x, y);
		if (!selectedCell || !selectedCell.figure || !selectedCell.color) return;

		selectedCell.isSelected = true;
		let possibleMoves = getPossibleMoves(this.board, x, y);
		let filteredPossibleMoves = filterMovesByKing(
			this.board,
			selectedCell,
			possibleMoves
		);

		markBoardCells(this._board, filteredPossibleMoves, selectedCell.color);
	}

	public move(x: number, y: number) {
		let selectedCell = getSelectedCell(this._board);
		let toCell = getCell(this._board, x, y);
		if (!selectedCell || !toCell) return;

		let [board, figure, color] = moveFigure(this._board, selectedCell, toCell);
		this._updateBoard(board);
		this._captureFigure(figure, color);
		this._changePlayer();
		this._clearBoard();

		this._setCheckAndCheckmate();
	}

	private _setCheckAndCheckmate() {
		this._isCheck = isKingUnderAtack(this._board, this._playerColor);
		this._isCheckmate = false;
		if (!this._isCheck) return;

		this._board.forEach((cell) => {
			if (cell.color === this._playerColor) {
				this.select(cell.x, cell.y, true);
			}
		});
		let cells = this._board.filter((cell) => cell.canMove || cell.isUnderAtack);
		this._isCheckmate = !cells.length;
		this._clearBoard();
	}
}
