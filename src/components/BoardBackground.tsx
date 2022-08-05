import React, { FC } from "react";
import Cell from "components/Cell";

const Row = ({ y }: { y: number }) => {
	return (
		<>
			{new Array(8).fill(0).map((_, x) => (
				<Cell key={`cell_${x}_${y}`} x={x} y={y} />
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
