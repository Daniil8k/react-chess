import { color, figureName } from "types/types";

interface IObjectKeys {
	[key: string]: string | undefined;
}

const FIGURE_IMAGES: IObjectKeys = {
	rook: require(`../assets/rook.svg`).default,
	knight: require(`../assets/knight.svg`).default,
	bishop: require(`../assets/bishop.svg`).default,
	queen: require(`../assets/queen.svg`).default,
	king: require(`../assets/king.svg`).default,
	pawn: require(`../assets/pawn.svg`).default,
	rook_black: require(`../assets/rook_black.svg`).default,
	knight_black: require(`../assets/knight_black.svg`).default,
	bishop_black: require(`../assets/bishop_black.svg`).default,
	queen_black: require(`../assets/queen_black.svg`).default,
	king_black: require(`../assets/king_black.svg`).default,
	pawn_black: require(`../assets/pawn_black.svg`).default,
};

export interface FigureProps {
	name: figureName;
	color: color;
}

export default function Figure({ name, color }: FigureProps) {
	return (
		<img
			width={30}
			height={30}
			className={"select-none"}
			src={FIGURE_IMAGES[color === "black" ? name + "_black" : name]}
			alt={''}
		/>
	);
}
