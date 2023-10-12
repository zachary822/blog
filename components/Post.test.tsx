import Post from "./Post";
import { render, screen } from "../utils/test-utils";

describe("Test Post", () => {
  test.skip("test post", () => {
    const post = {
      _id: "1",
      body: "body",
      title: "title",
      created: new Date().toLocaleString(),
      updated: new Date().toLocaleString(),
      tags: [],
    };
    render(<Post post={post} />);
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(post.created))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(post.updated))).toBeInTheDocument();
  });
});
