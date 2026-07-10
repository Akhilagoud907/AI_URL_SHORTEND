import { render, screen } from "@testing-library/react";
import LinksTable from "../components/LinksTable";

const links = [
  {
    id: "1",
    title: "GitHub",
    originalUrl: "https://github.com",
    shortCode: "github",
    isActive: true,
    clickCount: 10,
    createdAt: new Date().toISOString()
  }
];

test("renders link title", () => {

  render(
    <LinksTable
      links={links}
      onDelete={() => {}}
      onToggle={() => {}}
      onEdit={() => {}}
    />
  );

  expect(screen.getByText("GitHub")).toBeInTheDocument();

  test("shows empty state", () => {

  render(
    <LinksTable
      links={[]}
      onDelete={() => {}}
      onToggle={() => {}}
      onEdit={() => {}}
    />
  );

  expect(screen.getByText(/No Links Found/i)).toBeInTheDocument();

});

});