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

	public move(toX: number, toY: number): [figure | null, color | null] {
		const toCell = this._getCell(toX, toY);
		const selectedCell = this._getSelectedCell();
		if (!toCell || !selectedCell || !(toCell?.isUnderAtack || toCell?.canMove))
			return [null, null];

		const { figure, color } = toCell;
		this._moveFigure(selectedCell, toCell);
		this._captureFigure(figure, color);
		this._clearBoard();
		this._changePlayer();
		return [figure, color];
	}

	public select(x: number, y: number) {
		let cell = this._getCell(x, y);

		this._clearBoard();
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

	protected _moveFigure(cell: ICell, toCell: ICell) {
		toCell.figure = cell?.figure;
		toCell.color = cell?.color;
		cell.figure = null;
		cell.color = null;
	}

	protected _captureFigure(figure: figure | null, color: color | null) {
		if (figure && color) {
			let winColor: color = color === "white" ? "black" : "white";
			this.capturedFiguresMap[winColor][figure as captureFigure] += 1;
		}
	}

	protected _changePlayer() {
		this.playerColor = this.playerColor === "white" ? "black" : "white";
	}

	protected _clearBoard() {
		this.board.forEach((cell) => {
			cell.canMove = false;
			cell.isUnderAtack = false;
			cell.isSelected = false;
		});
	}

	protected _getSelectedCell() {
		return this.board.find((cell) => cell.isSelected);
	}

	protected _getCell(x: number, y: number) {
		let cell = this.board.find((cell) => cell.x === x && cell.y === y);
		return cell ? cell : ({} as ICell);
	}
}
