import { EShortColor, EShortFigureName, ICell } from "types/types";

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
	player: "w" | "b";
	board: ICell[];
	isCheck: boolean;
	isCheckmate: boolean;

	constructor() {
		this.player = "w";
		this.isCheck = false;
		this.isCheckmate = false;
		this.board = this._getDefaultBoard();
	}

	private _getDefaultBoard() {
		let board: ICell[] = [];
		let templateArr = DEFAULT_BOARD_TEMPLATE.split(/[\s]/).filter((i) => i);

		templateArr.forEach((str, index) => {
			let cell = {
				x: Math.trunc(index / SIZE),
				y: index % SIZE
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

	public setMoves() {
		if (this.board[3].figureName) {			
			this.board[25].figureName = this.board[3].figureName;
			this.board[25].figureColor = this.board[3].figureColor;
	
			delete this.board[3].figureName;
			delete this.board[3].figureColor;
		} else {
			this.board[3].figureName = this.board[25].figureName;
			this.board[3].figureColor = this.board[25].figureColor;
	
			delete this.board[25].figureName;
			delete this.board[25].figureColor;
		}
	}
}
