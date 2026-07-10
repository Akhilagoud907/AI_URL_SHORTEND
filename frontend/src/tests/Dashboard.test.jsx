import { render, screen } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";

test("Dashboard renders", () => {
  render(<Dashboard />);
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});