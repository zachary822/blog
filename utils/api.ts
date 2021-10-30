export const getPosts = () => fetch("/api/posts").then((res) => res.json());
