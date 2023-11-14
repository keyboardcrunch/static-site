# About This Project

This is a personal blog and micro-blog, written in TypeScript/Deno using the Lume static site generator.

**The key features are:**
* Simple landing page
* Personal links
* Blog posts with dedicated rss feed
* Micro-blog ("thoughts") with dedicated rss feed
* "Recent Reads" list to share interesting or educational links

It is a bit ugly at the moment because I prioritized learning Deno, TypeScript, and Lume over learning and using TailWind; so all the CSS is a bit hacky but it accomplishes what I set out to build and doesn't look bad. It's a living project that will evolve as my needs evolve.

## lumepost.ts

This is a Deno/TypeScript util to create a new post or 'thought' template within the respective directory, with
the necessary metadata.

`deno run --allow-read --allow-write lumepost.ts -h`
```
  Usage:   lumepost
  Version: 0.0.1   

  Description:

    Util to create a new Lume post or thought.

  Options:

    -h, --help                      - Show this help.                                                                          
    -V, --version                   - Show the version number for this program.                                                
    -n, --new        <post>         - Create a new post or thought.                       (required, Values: "post", "thought")
    -t, --title      <title>        - Post title.                                         (required)                           
    -d, --desc       <description>  - Optional post description.                                                               
    -c, --contained                 - Self-contained folder for post. Adds url: ./ meta. 
```

## serve.ts

The site started using Lume's serve() function, which was performant and works well on Deno Deploy, but the server need to evolve to include a "link share" API where I could dyamically add and remove links for the "Recently Read" section of my site without having to rebuild and republish (which the previous Shiori bookmark server API fetch required, which kept the site truly static). So this new server is based on Oak, leverages Deno KV, and still works great on Deno Deploy.

If you noticed that the API is missing POST/DELETE methods, or any visible means to adding and removing links, that's because it is. `linkshare.ts` is the answer, I found it more reasonable to directly interface with the KV store hosted by Deno Deploy so that my development and production environment could share data, plus the benefit of not needing extra keys and authentication than necessary.

## TODO
* Adding **short_title** to lumepost.ts output for new 'thoughts'. It's required.
* Make columns auto-align and auto-size (better) with and w/o "recent reads".
* ~~switch from build-time "recent reads" to API based method~~
* ~~Add option to limit the amount of bookmarks fetched~~
* ~~Complete the 'Recent Reads' bookmarks section to share recently read/bookmarked sites~~
* ~~Fix H1 left alignment on page.njk~~
* ~~Add pagination to posts/ and thoughts/~~
* ~~Create a helper util to create new post/thought pages~~
* ~~Setup the Lume Feed plugin so all site posts aren't bundled together~~
* ~~Add a theme toggle for dark/light mode~~
