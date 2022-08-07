export type color = "white" | "black";
export type figure = "rook" | "knight" | "bishop" | "queen" | "king" | "pawn";
export type captureFigure = "rook" | "knight" | "bishop" | "queen" | "pawn";

export enum EFigure {
	rook = "rook",
	knight = "knight",
	bishop = "bishop",
	queen = "queen",
	king = "king",
	pawn = "pawn"
}

export interface ICell {
	id: string;
	x: number;
	y: number;
	figure: figure | null;
	color: color | null;
	isSelected?: boolean;
	canMove?: boolean;
	isUnderAtack?: boolean;
}

export interface IPlayer {
	id: string;
	color: color;
	eatenFigures: figure[];
}

export enum EShortColor {
	b = "black",
	w = "white"
}

export enum EShortFigureName {
	r = "rook",
	h = "knight",
	b = "bishop",
	q = "queen",
	k = "king",
	p = "pawn"
}
