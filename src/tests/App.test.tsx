import { render, screen } from "@testing-library/react";
import App from "App";

test("renders App", () => {
	render(<App />);
	const div = screen.getByText(/App/i);
	expect(div).toBeInTheDocument();
});

test("sum", () => {
	expect(4 + 4).toEqual(8);
});
