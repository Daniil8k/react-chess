import { ICell } from "types/types";
import Chess from "./index";

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

	cellArrays.forEach((cellArr) => {
		const [posX, posY] = cellArr;
		let cell = this._getCell(posX, posY);

		if (cell.figure) {
			if (cell?.color !== color) {
				cell.isUnderAtack = true;
			}
		} else {
			cell.canMove = true;
		}
	});
}

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

	atackCells.forEach((cellArr) => {
		const [posX, posY] = cellArr;
		let cell = this._getCell(posX, posY);

		if (cell.figure && cell.color !== color) {
			cell.isUnderAtack = true;
		}
	});
}

function selectRook(this: Chess, cell: ICell) {
	_setHorizontalAndVertical.call(this, cell);
}

function selectBishop(this: Chess, cell: ICell) {
	_setDiagonalIndexs.call(this, cell);
}

function selectQueen(this: Chess, cell: ICell) {
	_setDiagonalIndexs.call(this, cell);
	_setHorizontalAndVertical.call(this, cell);
}

function _setByFunc(
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

function _setHorizontalAndVertical(this: Chess, cell: ICell) {
	let funcs = [
		([r, c]: number[]) => [r + 1, c],
		([r, c]: number[]) => [r - 1, c],
		([r, c]: number[]) => [r, c - 1],
		([r, c]: number[]) => [r, c + 1]
	];

	funcs.forEach((func) => {
		_setByFunc.call(this, cell, func);
	});
}

function _setDiagonalIndexs(this: Chess, cell: ICell) {
	let funcs = [
		([r, c]: number[]) => [r + 1, c + 1],
		([r, c]: number[]) => [r - 1, c - 1],
		([r, c]: number[]) => [r + 1, c - 1],
		([r, c]: number[]) => [r - 1, c + 1]
	];

	funcs.forEach((func) => {
		_setByFunc.call(this, cell, func);
	});
}

export { selectKnight, selectPawn, selectRook, selectBishop, selectQueen };
