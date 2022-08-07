import {
	color,
	EShortColor,
	EShortFigureName,
	ICell,
	EFigure,
	figure
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
	player: color;
	board: ICell[];
	isCheck: boolean;
	isCheckmate: boolean;

	constructor() {
		this.player = "white";
		this.isCheck = false;
		this.isCheckmate = false;
		this.board = this._getDefaultBoard();
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
		this._eatFigure(selectedCell, toCell);
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

	protected _eatFigure(cell: ICell, toCell: ICell) {
		toCell.figure = cell?.figure;
		toCell.color = cell?.color;
		cell.figure = null;
		cell.color = null;
	}

	protected _changePlayer() {
		this.player = this.player === "white" ? "black" : "white";
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
