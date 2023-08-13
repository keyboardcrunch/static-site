# About This Project

This is a personal blog and micro-blog, written in TypeScript/Deno using the Lume static site generator.

**The key features are:**
* Simple landing page
* Personal links
* Blog posts with dedicated rss feed
* Micro-blog ("thoughts") with dedicated rss feed
* "Recent Reads" recently read list generated from Shiori bookmark server API (on build)

It is a bit ugly at the moment because I prioritized learning Deno, TypeScript, and Lume over learning and using TailWind; 
so all the CSS is a bit hacky but it's close to exactly how I want things.

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

## TODO
* Make columns auto-align and auto-size with and w/o "recent reads"
* Add option to limit the amount of bookmarks fetched
* ~~Complete the 'Recent Reads' bookmarks section to share recently read/bookmarked sites~~
* ~~Fix H1 left alignment on page.njk~~
* ~~Add pagination to posts/ and thoughts/~~
* ~~Create a helper util to create new post/thought pages~~
* ~~Setup the Lume Feed plugin so all site posts aren't bundled together~~
* ~~Add a theme toggle for dark/light mode~~
