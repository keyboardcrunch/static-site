# About This Project

This is a personal blog and micro-blog, written in TypeScript/Deno using the Lume static site generator.

It's currently very ugly as I decided I didn't like the defaults of Tailwind CSS, didn't want to use WindiCSS
as it's deprecated, and I don't need the extras they come with. There's still a list of things todo to get this site
ready.

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
* Add pagination to posts/ and thoughts/
* ~~Create a helper util to create new post/thought pages~~
* Setup the Lume Feed plugin so all site posts aren't bundled together
* Complete the 'Good Reads' bookmarks aggregator for the home page
* Add a theme toggle for dark/light mode

