import { FC, useEffect, useRef, useState } from "react";
import { ICell } from "types/types";
import { transform } from "typescript";

interface FigureProps extends ICell {}

const Figure: FC<FigureProps> = ({ x, y, figureName }) => {
	return (
		<div
			style={{
				top: `${x * 2.5}rem`,
				left: `${y * 2.5}rem`,
			}}
			className={["absolute w-10 h-10 flex items-center justify-center"].join(
				" "
			)}
		>
			{figureName ? figureName[0] : ""}
		</div>
	);
};

export default Figure;
