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

export { selectKnight, selectPawn };
