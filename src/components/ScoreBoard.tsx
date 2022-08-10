import React, { FC } from "react";
import { captureFigure, color } from "types/types";
import ScoreBoardPart from "./ScoreBoardPart";

interface ScoreBoardProps {
	capturedFiguresMap: {
		[key in color]: {
			[key in captureFigure]: number;
		};
	};
}

const ScoreBoard: FC<ScoreBoardProps> = ({ capturedFiguresMap }) => {
	return (
		<div className="min-w-[18rem] flex flex-col gap-2 sm:min-w-[9rem]">
			{Object.entries(capturedFiguresMap).map(([color, capturedFigures]) => (
				<ScoreBoardPart
					key={color}
					color={color as color}
					capturedFigures={capturedFigures}
				/>
			))}
		</div>
	);
};

const areEqual = (prevProps: ScoreBoardProps, nextProps: ScoreBoardProps) => {
	return (
		JSON.stringify(prevProps.capturedFiguresMap) ===
		JSON.stringify(nextProps.capturedFiguresMap)
	);
};

export default React.memo(ScoreBoard, areEqual);
