import { FC } from "react";
import { color, figure } from "types/types";

interface ScoreBoardProps {
	playerColor: color;
	caputeredFigures: {
		[key in figure]?: number;
	};
	className?: string;
}

const ScoreBoard: FC<ScoreBoardProps> = ({
	className,
	playerColor,
	caputeredFigures
}) => {
	return (
		<div className={["w-36", className].join(" ")}>
			<span className="font-bold">{playerColor}</span>
			{Object.entries(caputeredFigures).map(([key, value]) => (
				<div
					style={{ fontWeight: value ? "bold" : "normal" }}
					className="flex justify-between px-2"
				>
					<span>{key}</span>
					<span>{value}</span>
				</div>
			))}
		</div>
	);
};

export default ScoreBoard;
