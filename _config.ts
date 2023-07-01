import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import en from "npm:date-fns/locale/es/index.js";
import feed from "lume/plugins/feed.ts";
import filter_pages from "lume/plugins/filter_pages.ts";
import inline from "lume/plugins/inline.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import minifyHTML from "lume/plugins/minify_html.ts";

const search = { returnPageData: true }; // Lume 2.0 prep, post.title vs post.data.title
const paginate = {/* your config here */};
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
        paginate,
    },
);

site
    .ignore("README.md")
    .copy("/static/", ".")
    .copyRemainingFiles() // include all other files stored in folders
    .remoteFile(
        "/assets/code.css",
        "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/github.min.css",
      )
    .use(date({
        locales: {en},
    }))
    .use(feed())
    .use(codeHighlight())
    .use(filter_pages())
    .use(inline())
    .use(minifyHTML());


export default site;