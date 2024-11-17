# About This Project

This is a personal blog and micro-blog, written in TypeScript using Deno's Lume static site generator.

**The key features are:**
* Simple landing page
* Blog posts with dedicated rss feed
* Micro-blog ("digests") with dedicated rss feed

It is a bit ugly at the moment because I prioritized learning Deno, TypeScript, and Lume over learning and using TailWind; so all the CSS is a bit hacky but it accomplishes what I set out to build and doesn't look bad. It's a living project that will evolve as my needs evolve.

## lumepost.ts

This is a Deno/TypeScript util to create a new post or 'digest' template within the respective directory, with
the necessary metadata.

`deno run --allow-read --allow-write newpost.ts -h`
```
  Usage:   newpost
  Version: 1.0.2  

  Description:

    Util to create a new Lume post or digest.

  Options:

    -h, --help                      - Show this help.                                                                         
    -V, --version                   - Show the version number for this program.                                               
    -n, --new        <post>         - Create a new post or digest.                        (required, Values: "post", "digest")
    -t, --title      <title>        - Post title.                                         (required)                          
    -st, --short     <description>  - Optional short title.                                                                   
    -d, --desc       <description>  - Optional post description.                                                              
    -c, --contained                 - Self-contained folder for post. Adds url: ./ meta.    
```

## serve.ts

The site started using Lume's serve() function, which was performant and works well on Deno Deploy, but through an evolution of the blog I've
added and removed features such as a link/bookmark API, recently read API, and some different uses of DenoKV. At this point I'm just using the
serve script to add some extra routes on top of the static site, for redirects and such.

## TODO
* ~~switch from build-time "recent reads" to API based method~~
* ~~Add option to limit the amount of bookmarks fetched~~
* ~~Complete the 'Recent Reads' bookmarks section to share recently read/bookmarked sites~~
* ~~Fix H1 left alignment on page.njk~~
* ~~Add pagination to posts/ and thoughts/~~
* ~~Create a helper util to create new post/thought pages~~
* ~~Setup the Lume Feed plugin so all site posts aren't bundled together~~
* ~~Add a theme toggle for dark/light mode~~
