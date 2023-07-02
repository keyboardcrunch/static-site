---
date: 2023-07-02
title: Deno and Lume
short_title: Deno and Lume
description: 
    Talking about my first experience with Deno and using Lume to 
    replace my Hugo static site. My first real Deno util, and Deno Deploy comments.

---
# First Experiences with Deno and Lume

Deno is awesome. Lume is pretty great too.

I'm in the process of building out a new static site with **Lume** (this site you're reading right now!), which is easy once you grok the design choices, and porting over everything I wrote under my last Hugo blog. This is where I really like markdown based static sites, a bit of copy/paste and update a few links and you're all set. I don't even want to think about all the wordpress and ghost sites I have decommissioned over time, and how much history lost (though I have the backups, I'm too lazy to merge it from json exports).

**Deno Deploy** was exceedingly easy to get working, just as all the reviews and feedback said and easier than the docs led on. I was able move my code to GitHub, sign-in to Deno Deploy with my GitHub account, link the project and done!

I'm enjoying Deno enough that I decided to write out the "new post" util called `lumepost.ts` in Deno, and while I've got very little previous experience with JavaScript and TypeScript, I was able to write it out in about 50 minutes with a lot of learning in the process. The next thing I'm eyeing is Deno executed with Supabase functions.