import { FC } from "react";
import { captureFigure, color } from "types/types";

interface ScoreBoardProps {
	capturedFiguresMap: {
		[key in color]: {
			[key in captureFigure]: number;
		};
	};
	className?: string;
}

interface BoardPartProps {
	color: color;
	capturedFigures: {
		[key in captureFigure]: number;
	};
	className?: string;
}

const BoardPart: FC<BoardPartProps> = ({ color, capturedFigures }) => {
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

const ScoreBoard: FC<ScoreBoardProps> = ({ capturedFiguresMap }) => {
	return (
		<div className="min-w-[18rem] flex flex-col gap-2 sm:min-w-[9rem]">
			{Object.entries(capturedFiguresMap).map(([color, capturedFigures]) => (
				<BoardPart
					key={color}
					color={color as color}
					capturedFigures={capturedFigures}
				/>
			))}
		</div>
	);
};

export default ScoreBoard;
