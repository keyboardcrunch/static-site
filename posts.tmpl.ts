export const layout = "layouts/posts.njk";
export const title = "keyboardcrunch - posts";
export const heading = "Posts";
export const pageroute = "posts";

export default function* ({ search, paginate }) {
  const posts = search.pages("type=blogpost", "date=desc");

  for (
    const data of paginate(posts, { url, size: 20 })
  ) {
    if (data.pagination.page === 1) {
      data.menu = {
        visible: true,
        order: 1,
      };
    }

    yield data;
  }
}

function url(n) {
  if (n === 1) {
    return "/posts/";
  }

  return `/posts/${n}/`;
}