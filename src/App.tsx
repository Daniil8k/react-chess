import Board from "components/Board";

function App() {
	return (
		<div className="min-h-screen flex flex-col gap-2 items-center justify-center">
			<h1 className="text-lg font-bold">Chess</h1>
			<Board />
		</div>
	);
}

export default App;
