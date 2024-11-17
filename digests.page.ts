export const layout = "layouts/paginate.njk";
export const pageroute = "digests";
export const title = "keyboardcrunch - digests";
export const heading = "Digests";

export default function* ({ search, paginate, paginate_count }) {
    const posts = search.pages("type=digest", "date=desc");
    for (
        const data of paginate(posts, { url, size: paginate_count })
      ) {
        // Show the first page in the menu
        if (data.pagination.page === 1) {
          data.menu = {
            visible: true,
            order: 1,
          };
        }

        yield {
            ...data,
            title: title
        };
      }
  }

  function url(n) {
    if (n === 1) {
        return "/digests/";
    } else {
      return `/digests/${n}/`;
    }
  }