import { color, EFigure, ICell } from "types/types";
import {
	selectKnight,
	selectPawn,
	selectRook,
	selectBishop,
	selectQueen,
	selectKing
} from "./select";

function getCell(board: ICell[], x: number, y: number) {
	return board.find((cell) => cell.x === x && cell.y === y);
}

function getDeepCopy<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

function markBoardCells(board: ICell[], cells: ICell[], color: color) {
	cells.forEach((cell) => {
		let boardCell = getCell(board, cell.x, cell.y);
		if (!boardCell) return;

		if (boardCell.figure) {
			if (boardCell?.color !== color) {
				boardCell.isUnderAtack = true;
			}
		} else {
			boardCell.canMove = true;
		}
	});
}

function getSelectedCell(board: ICell[]) {
	return board.find((cell) => cell.isSelected);
}

function getKing(board: ICell[], color: color) {
	return board.find((cell) => cell.color === color && cell.figure === "king");
}

function filterMovesByKing(
	board: ICell[],
	selectedCell: ICell,
	possibleMoves: ICell[]
) {
	return possibleMoves.filter((cell) => {
		let [movedBoard] = moveFigure(board, selectedCell, cell);
		return (
			selectedCell.color && !isKingUnderAtack(movedBoard, selectedCell.color)
		);
	});
}

function moveFigure(
	board: ICell[],
	{ x: fromX, y: fromY }: ICell,
	{ x: toX, y: toY }: ICell
): [ICell[], ICell["figure"], ICell["color"]] {
	let boardCopy = getDeepCopy(board);
	let fromCell = getCell(boardCopy, fromX, fromY);
	let toCell = getCell(boardCopy, toX, toY);
	if (!fromCell || !toCell) return [[], null, null];

	const { figure, color } = toCell;
	toCell.figure = fromCell?.figure;
	toCell.color = fromCell?.color;
	fromCell.figure = null;
	fromCell.color = null;

	return [boardCopy, figure, color];
}

function isKingUnderAtack(board: ICell[], color: color) {
	let boardCopy = getDeepCopy(board);
	board.forEach((cell) => {
		if (cell.figure && cell.color !== color) {
			let possibleMoves = getPossibleMoves(boardCopy, cell.x, cell.y);
			cell.color && markBoardCells(boardCopy, possibleMoves, cell.color);
		}
	});

	let king = getKing(boardCopy, color);
	return !!king?.isUnderAtack;
}

function getPossibleMoves(board: ICell[], x: number, y: number) {
	let boardCopy = getDeepCopy(board);
	let cell = getCell(board, x, y);
	let getBoardCell = (x: number, y: number) => {
		let cell = getCell(boardCopy, x, y);
		return cell ? cell : ({} as ICell);
	};

	switch (cell?.figure) {
		case EFigure.knight:
			selectKnight(cell, getBoardCell);
			break;
		case EFigure.pawn:
			selectPawn(cell, getBoardCell);
			break;
		case EFigure.rook:
			selectRook(cell, getBoardCell);
			break;
		case EFigure.bishop:
			selectBishop(cell, getBoardCell);
			break;
		case EFigure.queen:
			selectQueen(cell, getBoardCell);
			break;
		case EFigure.king:
			selectKing(cell, getBoardCell);
			break;
	}

	return boardCopy.filter((cell) => cell.canMove || cell.isUnderAtack);
}

export {
	getDeepCopy,
	getCell,
	markBoardCells,
	getSelectedCell,
	getKing,
	moveFigure,
	filterMovesByKing,
	isKingUnderAtack,
	getPossibleMoves
};
