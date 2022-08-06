import React, { FC } from "react";
import { color, ICell } from "types/types";
import Figure from "./Figure";

interface FigureProps extends ICell {
	playerColor: color;
	onSelect: (cell: ICell) => void;
}

const Cell: FC<FigureProps> = ({ playerColor, onSelect, ...cell }) => {
	const { x, y, figureName, figureColor, isSelected, canMove, isUnderAtack } =
		cell;
	const isCurrentPlayer = figureName && playerColor === figureColor;

	const onClick = () => {
		isCurrentPlayer && onSelect(cell);
	};

	return (
		<div
			onClick={onClick}
			style={{
				top: `${x * 2.5}rem`,
				left: `${y * 2.5}rem`
			}}
			className={[
				"absolute w-10 h-10 flex items-center justify-center",
				isCurrentPlayer ? "cursor-pointer" : "cursor-default",
				isCurrentPlayer ? "hover:bg-accent" : "",
				isSelected ? "bg-accent" : "",
				isUnderAtack ? "bg-red-500" : ""
			].join(" ")}
		>
			{figureColor && figureName ? (
				<Figure name={figureName} color={figureColor} />
			) : (
				canMove && <div className="w-3 h-3 rounded-[50%] bg-green-500"></div>
			)}
		</div>
	);
};

export default React.memo(Cell);
