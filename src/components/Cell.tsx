import { FC, useEffect, useRef, useState } from "react";
import { ICell } from "types/types";

interface CellProps extends ICell {}

const Cell: FC<CellProps> = ({ x, y }) => {
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

export default Cell;
