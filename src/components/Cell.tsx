import React, { FC } from "react";
import { color, ICell } from "types/types";
import Figure from "./Figure";

interface FigureProps extends ICell {
	playerColor: color;
	onSelect: (cell: ICell) => void;
}

const Cell: FC<FigureProps> = ({ playerColor, onSelect, ...cell }) => {
	const { x, y, figure, color, isSelected, canMove, isUnderAtack } = cell;
	const isCurrentPlayer = playerColor === color;

	const onClick = () => {
		if (isCurrentPlayer || canMove || isUnderAtack) {
			onSelect(cell);
		}
	};

	return (
		<div
			onClick={onClick}
			style={{
				top: `${y * 2.5}rem`,
				left: `${x * 2.5}rem`
			}}
			className={[
				"absolute w-10 h-10 flex items-center justify-center",
				isCurrentPlayer || canMove || isUnderAtack
					? "cursor-pointer"
					: "cursor-default",
				isCurrentPlayer ? "hover:bg-accent" : "",
				canMove ? "hover:bg-green-500" : "",
				isSelected ? "bg-accent" : "",
				isUnderAtack ? "bg-red-500" : ""
			].join(" ")}
		>
			{figure && color ? (
				<Figure name={figure} color={color} />
			) : (
				canMove && <div className="w-3 h-3 rounded-[50%] bg-green-500"></div>
			)}
		</div>
	);
};

export default React.memo(Cell);
