import { color, ICell } from "types/types";
import Chess from "./index";

function selectPawn(this: Chess, { x, y, color }: ICell) {
	let dir = color === "white" ? 1 : -1;
	let isFirstMove = color === "white" ? y === 1 : y === 6;
	let moveCells = [[x, y + 1 * dir]];
	let atackCells = [
		[x - 1, y + 1 * dir],
		[x + 1, y + 1 * dir]
	];

	if (isFirstMove) {
		moveCells.push([x, y + 2 * dir]);
	}

	for (const cellArr of moveCells) {
		const [posX, posY] = cellArr;
		let cell = this._getCell(posX, posY);

		if (cell?.figure) {
			break;
		} else {
			cell.canMove = true;
		}
	}

	_selectByArr.call(this, atackCells, color, true);
}

function selectKnight(this: Chess, { x, y, color }: ICell) {
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

	_selectByArr.call(this, cellArrays, color);
}

function selectKing(this: Chess, { x, y, color }: ICell) {
	let cellArrays = [
		[x - 1, y],
		[x - 1, y + 1],
		[x, y + 1],
		[x + 1, y + 1],
		[x + 1, y],
		[x + 1, y - 1],
		[x, y - 1],
		[x - 1, y - 1]
	];

	_selectByArr.call(this, cellArrays, color);
}

function selectRook(this: Chess, cell: ICell) {
	_selectHorizontalAndVertical.call(this, cell);
}

function selectBishop(this: Chess, cell: ICell) {
	_selectDiagonal.call(this, cell);
}

function selectQueen(this: Chess, cell: ICell) {
	_selectDiagonal.call(this, cell);
	_selectHorizontalAndVertical.call(this, cell);
}

function _selectByArr(
	this: Chess,
	cellArrays: number[][],
	color: color | null,
	onlyAtack = false
) {
	cellArrays.forEach((cellArr) => {
		const [posX, posY] = cellArr;
		let cell = this._getCell(posX, posY);

		if (cell.figure) {
			if (cell?.color !== color) {
				cell.isUnderAtack = true;
			}
		} else {
			!onlyAtack && (cell.canMove = true);
		}
	});
}

function _selectByFunc(
	this: Chess,
	{ x, y, color }: ICell,
	callBack: ([a, b]: number[]) => number[]
) {
	let cellArr = [x, y];

	do {
		cellArr = callBack(cellArr);
		let cell = this._getCell(cellArr[0], cellArr[1]);

		if (cell?.figure) {
			if (cell?.color !== color) {
				cell.isUnderAtack = true;
			}

			break;
		}

		cell.canMove = true;
	} while (this._getCell(cellArr[0], cellArr[1]).id);
}

function _selectHorizontalAndVertical(this: Chess, cell: ICell) {
	let funcs = [
		([r, c]: number[]) => [r + 1, c],
		([r, c]: number[]) => [r - 1, c],
		([r, c]: number[]) => [r, c - 1],
		([r, c]: number[]) => [r, c + 1]
	];

	funcs.forEach((func) => {
		_selectByFunc.call(this, cell, func);
	});
}

function _selectDiagonal(this: Chess, cell: ICell) {
	let funcs = [
		([r, c]: number[]) => [r + 1, c + 1],
		([r, c]: number[]) => [r - 1, c - 1],
		([r, c]: number[]) => [r + 1, c - 1],
		([r, c]: number[]) => [r - 1, c + 1]
	];

	funcs.forEach((func) => {
		_selectByFunc.call(this, cell, func);
	});
}

export {
	selectKnight,
	selectPawn,
	selectRook,
	selectBishop,
	selectQueen,
	selectKing
};
