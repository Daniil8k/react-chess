import {
	color,
	EFigureName,
	EShortColor,
	EShortFigureName,
	ICell
} from "types/types";

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
			let x = Math.trunc(index / SIZE);
			let y = index % SIZE;

			let cell = {
				id: `cell_${x}_${y}`,
				x,
				y,
				isSelected: false,
				isUnderAtack: false,
				canMove: false
			} as ICell;

			if (str !== EMPTY_CELL) {
				const [color, figureName] = str.split("");

				cell.figureName =
					EShortFigureName[figureName as keyof typeof EShortFigureName];
				cell.figureColor = EShortColor[color as keyof typeof EShortColor];
			}

			board.push(cell);
		});

		return board;
	}

	public setPossibleMoves(cell: ICell) {
		this._clearBoard();
		this._selectCell(cell.x, cell.y);

		switch (cell.figureName) {
			case EFigureName.knight:
				this._setKnightPossibleMoves(cell);
				break;
		}
	}

	private _clearBoard() {
		this.board.forEach((cell) => {
			cell.canMove = false;
			cell.isUnderAtack = false;
			cell.isSelected = false;
		});
	}

	private _selectCell(x: number, y: number) {
		let cell = this._getCell(x, y);
		cell && (cell.isSelected = true);
	}

	private _getCell(x: number, y: number) {
		return this.board.find((cell) => cell.x === x && cell.y === y);
	}

	private _updateCell(x: number, y: number, color: color) {
		let cell = this._getCell(x, y);
		if (!cell) return;

		if (cell.figureName) {
			if (cell?.figureColor !== color) {
				cell.isUnderAtack = true;
			}
		} else {
			cell.canMove = true;
		}
	}

	private _setKnightPossibleMoves({ x, y, figureColor }: ICell) {
		let cellArrays = [
			[x - 1, y + 2],
			[x + 1, y + 2],
			[x - 1, y - 2],
			[x + 1, y - 2],
			[x - 2, y + 1],
			[x + 2, y + 1],
			[x - 2, y - 1],
			[x + 2, y - 1]
		];

		cellArrays.forEach((cellArr) => {
			const [posX, posY] = cellArr;
			figureColor && this._updateCell(posX, posY, figureColor);
		});
	}
}
