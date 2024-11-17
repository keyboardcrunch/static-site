import lume from "lume/mod.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import date from "lume/plugins/date.ts";
import feed from "lume/plugins/feed.ts";
import inline from "lume/plugins/inline.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import robots from "lume/plugins/robots.ts";
//import minifyHTML from "lume/plugins/minify_html.ts";

const blogFeed = {
    output: ["/posts/feed.rss", "/posts/feed.json"],
    query: "type=blogpost",
    sort: "date=desc",
    limit: 20,
    info: {
        title: "keyboardcrunch.com",
        description: "Thoughts and ramblings of a security-minded, internet dwelling creature.",
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

const digestFeed = {
    output: ["/digests/feed.rss", "/digests/posts.json"],
    query: "type=digest",
    sort: "date=desc",
    limit: 20,
    info: {
        title: "keyboardcrunch.com",
        description: "Thoughts and ramblings of a security-minded, internet dwelling creature.",
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
    }
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
    .use(feed(digestFeed))
    .use(codeHighlight())
    .use(inline())
    .use(robots({
        allow: ["Bingbot", "Googlebot", "DuckAssistBot", "DuckDuckBot", "BingPreview", 
            "FreshRSS", "Miniflux", "yacybot", 
            "NewsBlur", "Mastodon"],
        disallow: "*",
      }))
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