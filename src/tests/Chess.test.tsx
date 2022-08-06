import { ICell } from "types/types";
import Chess from "utils/chess";

const chess = new Chess();
const initialBoard = JSON.parse(JSON.stringify(chess.board));

const _getCell = (board: ICell[], x: number, y: number) => {
	return board.find((cell) => cell.x === x && cell.y === y);
};

it("Knight possible moves", () => {
	let whiteKnightCell = {
		id: "cell_0_6",
		x: 0,
		y: 6,
		figureName: "knight",
		figureColor: "white"
	} as ICell;
	let cell_0_6 = _getCell(initialBoard, 0, 6);
	let cell_2_5 = _getCell(initialBoard, 2, 5);
	let cell_2_7 = _getCell(initialBoard, 2, 7);
	cell_0_6 && (cell_0_6.isSelected = true);
	cell_2_5 && (cell_2_5.canMove = true);
	cell_2_7 && (cell_2_7.canMove = true);

	chess.setPossibleMoves(whiteKnightCell);
	expect(chess.board).toEqual(initialBoard);
});