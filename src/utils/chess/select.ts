import { color, ICell } from "types/types";

type GetCell = (x: number, y: number) => ICell;

function selectPawn({ x, y, color }: ICell, getCell: GetCell) {
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
		let cell = getCell(posX, posY);

		if (cell?.figure) {
			break;
		} else {
			cell.canMove = true;
		}
	}

	_selectByArr(atackCells, getCell, color, true);
}

function selectKnight({ x, y, color }: ICell, getCell: GetCell) {
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

	_selectByArr(cellArrays, getCell, color);
}

function selectKing({ x, y, color }: ICell, getCell: GetCell) {
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

	_selectByArr(cellArrays, getCell, color);
}

function selectRook(cell: ICell, getCell: GetCell) {
	_selectHorizontalAndVertical(cell, getCell);
}

function selectBishop(cell: ICell, getCell: GetCell) {
	_selectDiagonal(cell, getCell);
}

function selectQueen(cell: ICell, getCell: GetCell) {
	_selectDiagonal(cell, getCell);
	_selectHorizontalAndVertical(cell, getCell);
}

function _selectByArr(
	cellArrays: number[][],
	getCell: GetCell,
	color: color | null,
	onlyAtack = false
) {
	cellArrays.forEach((cellArr) => {
		const [posX, posY] = cellArr;
		let cell = getCell(posX, posY);

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
	{ x, y, color }: ICell,
	getCell: GetCell,
	callBack: ([a, b]: number[]) => number[]
) {
	let cellArr = [x, y];

	do {
		cellArr = callBack(cellArr);
		let cell = getCell(cellArr[0], cellArr[1]);

		if (cell?.figure) {
			if (cell?.color !== color) {
				cell.isUnderAtack = true;
			}

			break;
		}

		cell.canMove = true;
	} while (getCell(cellArr[0], cellArr[1]).id);
}

function _selectHorizontalAndVertical(cell: ICell, getCell: GetCell) {
	let funcs = [
		([r, c]: number[]) => [r + 1, c],
		([r, c]: number[]) => [r - 1, c],
		([r, c]: number[]) => [r, c - 1],
		([r, c]: number[]) => [r, c + 1]
	];

	funcs.forEach((func) => {
		_selectByFunc(cell, getCell, func);
	});
}

function _selectDiagonal(cell: ICell, getCell: GetCell) {
	let funcs = [
		([r, c]: number[]) => [r + 1, c + 1],
		([r, c]: number[]) => [r - 1, c - 1],
		([r, c]: number[]) => [r + 1, c - 1],
		([r, c]: number[]) => [r - 1, c + 1]
	];

	funcs.forEach((func) => {
		_selectByFunc(cell, getCell, func);
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
