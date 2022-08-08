import React, { FC } from "react";
import { color } from "types/types";

interface BoardHeaderProps {
	playerColor: color;
	isCheck: boolean;
	isCheckmate: boolean;
}

const BoardHeader: FC<BoardHeaderProps> = ({
	playerColor,
	isCheck,
	isCheckmate
}) => {
	return (
		<header className="flex items-center justify-between mb-2">
			<span>
				Move: <span className="font-bold">{playerColor}</span>
			</span>
			<span
				style={{ opacity: isCheck || isCheckmate ? 1 : 0 }}
				className="text-red-500"
			>
				{isCheck ? "Check" : "Checkmate"}
			</span>
		</header>
	);
};

export default React.memo(BoardHeader);
