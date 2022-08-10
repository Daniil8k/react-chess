import React, { FC } from "react";
import { color, ICell } from "types/types";
// import Figure from "./Figure";
const Figure = React.lazy(() => import('./Figure'))

interface FigureProps extends ICell {
	playerColor: color;
	canSelect: (cell: ICell) => boolean;
	onSelect: (cell: ICell) => void;
}

const Cell: FC<FigureProps> = ({
	playerColor,
	canSelect,
	onSelect,
	...cell
}) => {
	const { x, y, figure, color, isSelected, canMove, isUnderAtack } = cell;

	const onClick = () => {
		if (canSelect(cell)) {
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
				canSelect(cell) ? "cursor-pointer" : "cursor-default",
				canSelect(cell) ? "hover:bg-accent" : "",
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
