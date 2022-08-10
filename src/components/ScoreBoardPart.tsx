import React, { FC } from "react";
import { captureFigure, color } from "types/types";

interface ScoreBoardPartProps {
	color: color;
	capturedFigures: {
		[key in captureFigure]: number;
	};
}

const ScoreBoardPart: FC<ScoreBoardPartProps> = ({
	color,
	capturedFigures
}) => {
	return (
		<div>
			<span className="font-bold">{color}</span>
			<div>
				{Object.entries(capturedFigures).map(([figure, count]) => (
					<div
						key={`${color}_${figure}`}
						style={{ fontWeight: count ? "bold" : "normal" }}
						className="flex justify-between px-2"
					>
						<span>{figure}</span>
						<span>{count}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default React.memo(ScoreBoardPart);
