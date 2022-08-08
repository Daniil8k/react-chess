import {
	color,
	EShortColor,
	EShortFigureName,
	ICell,
	EFigure,
	figure,
	captureFigure
} from "types/types";
import {
	selectBishop,
	selectKing,
	selectKnight,
	selectPawn,
	selectQueen,
	selectRook
} from "./select";

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

export default class Chess {
	playerColor: color;
	board: ICell[];
	isCheck: boolean;
	isCheckmate: boolean;
	capturedFiguresMap: {
		[key in color]: {
			[key in captureFigure]: number;
		};
	};

	constructor() {
		this.playerColor = "white";
		this.isCheck = false;
		this.isCheckmate = false;
		this.board = this._getDefaultBoard();
		this.capturedFiguresMap = {
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

	public select(x: number, y: number, noClear = false) {
		let cell = this._getCell(x, y);

		!noClear && this._clearBoard();
		cell.isSelected = true;
		switch (cell?.figure) {
			case EFigure.knight:
				selectKnight.call(this, cell);
				break;
			case EFigure.pawn:
				selectPawn.call(this, cell);
				break;
			case EFigure.rook:
				selectRook.call(this, cell);
				break;
			case EFigure.bishop:
				selectBishop.call(this, cell);
				break;
			case EFigure.queen:
				selectQueen.call(this, cell);
				break;
			case EFigure.king:
				selectKing.call(this, cell);
				break;
		}
	}

	public move(toX: number, toY: number): [figure | null, color | null] {
		const toCell = this._getCell(toX, toY);
		const selectedCell = this._getSelectedCell();
		if (
			!toCell ||
			!selectedCell ||
			!selectedCell.figure ||
			!selectedCell.color ||
			!(toCell?.isUnderAtack || toCell?.canMove)
		)
			return [null, null];

		const { figure, color } = toCell;
		this._moveFigure(selectedCell, toCell);
		this._captureFigure(figure, color);
		this._clearBoard();
		this._changePlayer();
		this._afterMove();

		return [figure, color];
	}

	protected _afterMove() {
		let playerKing = this._getKingCell(this.playerColor);
		if (!playerKing) return;

		if (this._testCheck(playerKing)) {
			this.isCheck = true;
			this.select(playerKing.x, playerKing.y, true);

			if (this._testCheckmate(playerKing)) {
				this.isCheckmate = true;
			}
		}
	}

	protected _testCheck(playerKing: ICell) {
		let enemyColor: color = playerKing.color === "white" ? "black" : "white";

		this.board.forEach((cell) => {
			if (cell.color === enemyColor) {
				this.select(cell.x, cell.y, true);
			}
		});

		let isCheck = !!playerKing?.isUnderAtack;
		this._clearBoard();

		return isCheck;
	}

	protected _getDeepCopy<T>(obj: T): T {
		return JSON.parse(JSON.stringify(obj));
	}

	protected _testCheckmate(playerKing: ICell) {
		let kingCanMoveArr = this.board.filter(
			(cell) => cell.canMove || cell.isUnderAtack
		);
		let boardCopy = this._getDeepCopy(this.board);

		let kingPossibleMoves = kingCanMoveArr.filter((cell) => {
			if (!playerKing || !playerKing.color) return false;

			this.board = this._getDeepCopy(boardCopy);
			this.select(playerKing.x, playerKing.y);
			this.move(cell.x, cell.y);

			let newPlayerKing = this._getKingCell(playerKing.color);
			return newPlayerKing && !this._testCheck(newPlayerKing);
		});

		this.board = boardCopy;
		this._clearBoard();

		kingPossibleMoves.forEach((cell) => {
			if (cell.figure) {
				if (cell?.color !== playerKing.color) {
					cell.isUnderAtack = true;
				}
			} else {
				cell.canMove = true;
			}
		});

		return !kingPossibleMoves.length;
	}

	protected _moveFigure(cell: ICell, toCell: ICell) {
		toCell.figure = cell?.figure;
		toCell.color = cell?.color;
		cell.figure = null;
		cell.color = null;
	}

	protected _captureFigure(figure: figure | null, color: color | null) {
		if (figure && figure !== "king" && color) {
			let winColor: color = color === "white" ? "black" : "white";
			this.capturedFiguresMap[winColor][figure as captureFigure] += 1;
		}
	}

	protected _changePlayer() {
		this.playerColor = this.playerColor === "white" ? "black" : "white";
	}

	protected _clearBoard() {
		this.isCheck = false;
		this.isCheckmate = false;

		this.board.forEach((cell) => {
			cell.canMove = false;
			cell.isUnderAtack = false;
			cell.isSelected = false;
		});
	}

	protected _getKingCell(color: color) {
		return this.board.find(
			(cell) => cell.figure === "king" && cell.color === color
		);
	}

	protected _getSelectedCell() {
		return this.board.find((cell) => cell.isSelected);
	}

	protected _getCell(x: number, y: number) {
		let cell = this.board.find((cell) => cell.x === x && cell.y === y);
		return cell ? cell : ({} as ICell);
	}
}
