export type color = "white" | "black";
export type figureName =
	| "rook"
	| "knight"
	| "bishop"
	| "queen"
	| "king"
	| "pawn";

export enum EFigureName {
	rook = "rook",
	knight = "knight",
	bishop = "bishop",
	queen = "queen",
	king = "king",
	pawn = "pawn"
}

export interface IPlayer {
	id: string;
	color: color;
	eatenFigures: IFigure[];
}

export interface IFigure {
	name: figureName;
	color: color;
}

export interface ICell {
	x: number;
	y: number;
	figureName?: figureName;
	figureColor?: color;
	isSelected?: boolean;
	canMove?: boolean;
	isUnderAtack?: boolean;
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
