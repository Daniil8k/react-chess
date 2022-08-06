import { FC } from "react";
import { color, ICell } from "types/types";
import Figure from "./Figure";

interface FigureProps extends ICell {
	playerColor: color;
	onSelect: () => void;
}

const Cell: FC<FigureProps> = ({
	x,
	y,
	figureName,
	figureColor,
	playerColor,
	isSelected,
	onSelect
}) => {
	const isCurrentPlayer = figureName && playerColor === figureColor;

	const onClick = () => {
		isCurrentPlayer && onSelect();
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
				isSelected ? "bg-accent" : ""
			].join(" ")}
		>
			{figureColor && figureName && (
				<Figure name={figureName} color={figureColor} />
			)}
		</div>
	);
};

export default Cell;
