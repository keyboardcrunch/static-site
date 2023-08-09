export const layout = "layouts/posts.njk";
export const title = "keyboardcrunch - thoughts";
export const heading = "Thoughts";
export const pageroute = "thoughts";

export default function* ({ search, paginate }) {
  const posts = search.pages("type=thought", "date=desc");

  for (
    const data of paginate(posts, { url, size: 10 })
  ) {
    // Show the first page in the menu
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
    return "/thoughts/";
  }

  return `/thoughts/${n}/`;
}