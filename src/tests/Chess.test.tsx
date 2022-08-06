import { ICell } from "types/types";
import Chess from "utils/chess";

let chess: Chess;
let initialBoard: ICell[] = [];

beforeEach(() => {
	chess = new Chess();
	initialBoard = JSON.parse(JSON.stringify(chess.board));
});

const _getCell = (board: ICell[], x: number, y: number) => {
	let cell = board.find((cell) => cell.x === x && cell.y === y);
	return cell ? cell : ({} as ICell);
};

it("Select Knight", () => {
	let cell_0_6 = _getCell(initialBoard, 0, 6);
	let cell_2_5 = _getCell(initialBoard, 2, 5);
	let cell_2_7 = _getCell(initialBoard, 2, 7);

	cell_0_6.isSelected = true;
	cell_2_5.canMove = true;
	cell_2_7.canMove = true;

	chess.select(0, 6);
	expect(chess.board).toEqual(initialBoard);
});

it("Move knight", () => {
	let cell_0_6 = _getCell(initialBoard, 0, 6);
	let cell_2_7 = _getCell(initialBoard, 2, 7);

	cell_2_7.figure = cell_0_6?.figure;
	cell_2_7.color = cell_0_6?.color;
	cell_0_6.figure = null;
	cell_0_6.color = null;
	cell_0_6.isSelected = false;

	chess.select(0, 6);
	chess.move(2, 7);
	expect(chess.board).toEqual(initialBoard);
});
