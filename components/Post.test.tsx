import Post from "./Post";
import { render, screen } from "@testing-library/react";

describe("Test Post", () => {
  test("test post", () => {
    const post = {
      _id: "1",
      body: "body" as any,
      title: "title",
      created: new Date().toLocaleString(),
    };
    render(<Post post={post} />);
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.created)).toBeInTheDocument();
  });
});
