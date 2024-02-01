import lume from "lume/mod.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import date from "lume/plugins/date.ts";
import feed from "lume/plugins/feed.ts";
import filter_pages from "lume/plugins/filter_pages.ts";
import inline from "lume/plugins/inline.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import { login, get_bookmarks } from "./shiori.ts";

// Load "recently read" from bookmarks server
const bm_session = await login();
const bookmarks = await get_bookmarks(bm_session, true); // true = public bookmarks only

// Lume Site Setup
const search = { returnPageData: true }; // Lume 2.0 prep, post.title vs post.data.title
const blogFeed = {
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
        title: "=title",
        description: "=description",
        date: "=date",
        content: "$.post-content",
    },
};
const thoughtFeed = {
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

site
    .ignore("README.md", "deno.lock")
    .copy("/static/", ".")
    .copyRemainingFiles()
    .remoteFile(
        "/assets/code.css",
        "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/github.min.css",
      )
    .use(nunjucks())
    .use(date())
    .use(feed(blogFeed))
    .use(feed(thoughtFeed))
    .use(codeHighlight())
    .use(filter_pages())
    .use(inline())
    .data("bookmarks", bookmarks)
    .ignore((path) => {
        return path.match(/.*\.bak$/) !== null;
    })
    .script(
        "publish",
        "deno task build",
        "git add _site/",
        "git commit -m 'automated publish task'",
        "git push origin main"
    );

export default site;