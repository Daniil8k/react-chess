import React, { FC } from "react";

const Piece = ({ x, y }: { x: number; y: number }) => {
	const isDark = (x + y) % 2 === 0;

	return (
		<div
			className={[
				"w-10 h-10 flex items-center justify-center",
				isDark ? "bg-cell-dark" : "bg-cell"
			].join(" ")}
		></div>
	);
};

const Row = ({ y }: { y: number }) => {
	return (
		<>
			{new Array(8).fill(0).map((_, x) => (
				<Piece key={`bg_${x}_${y}`} x={x} y={y} />
			))}
		</>
	);
};

const BoardBackground: FC = () => {
	return (
		<div className="inline-grid grid-cols-8">
			{new Array(8).fill(0).map((_, y) => (
				<Row key={y} y={y} />
			))}
		</div>
	);
};

export default React.memo(BoardBackground);
