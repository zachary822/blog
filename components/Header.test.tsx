import Header from "./Header";
import { render, screen } from "@testing-library/react";

describe("Test Header", () => {
  test("Header should render title", () => {
    const TEST_TITLE = "test title";

    render(<Header title={TEST_TITLE} />);

    expect(screen.getByText(TEST_TITLE)).toBeInTheDocument();
  });
});
