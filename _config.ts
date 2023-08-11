import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import feed from "lume/plugins/feed.ts";
import filter_pages from "lume/plugins/filter_pages.ts";
import inline from "lume/plugins/inline.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
//import minifyHTML from "lume/plugins/minify_html.ts";

const search = { returnPageData: true }; // Lume 2.0 prep, post.title vs post.data.title
const blogFeed = {
    // Feed query and results
    output: ["/posts/feed.rss"],
    query: "type=blogpost",
    sort: "date=desc",
    limit: 20,
    info: {
        title: "keyboardcrunch.com",
        description: "Thoughts and ramblings of an internet dwelling creature.",
        date: new Date(),
        lang: "en",
        generator: false, // don't report feed generator
    },
    items: {
        // configuration of feed items
        title: "=title",
        description: "=description",
        date: "=date",
        content: "$.post-content",
    },
};
const thoughtFeed = {
    // Feed query and results
    output: ["/thoughts/feed.rss"],
    query: "type=thought",
    sort: "date=desc",
    limit: 20,
    info: {
        title: "keyboardcrunch.com",
        description: "Thoughts and ramblings of an internet dwelling creature.",
        date: new Date(),
        lang: "en",
        generator: false, // don't report feed generator
    },
    items: {
        // configuration of feed items
        title: "=title",
        description: "=description",
        date: "=date",
        content: "$.post-content",
    },
};
const site = lume(
    {
        components: {
            variable: "components",
        },
        server: {
            page404: "/404/",
        },
    },
    { 
        search,
    },
);

// Some scripts that can be run with `lume run X`
site.script(
    "publish",
    "deno task build",
    "git add _site/",
    "git commit -m 'automated publish task'",
    "git push origin main"
);

// Ignore backup files
site.ignore((path) => {
  return path.match(/.*\.bak$/) !== null;
});

site
    .ignore("README.md", "deno.lock")
    .copy("/static/", ".")
    .copyRemainingFiles() // include all other files stored in folders
    .remoteFile(
        "/assets/code.css",
        "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/github.min.css",
      )
    .use(date())
    .use(feed(blogFeed))
    .use(feed(thoughtFeed))
    .use(codeHighlight())
    .use(filter_pages())
    .use(inline());
    //.use(minifyHTML());


export default site;