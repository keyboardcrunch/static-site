---
title: TypeScript... Seriously!
date: "2023-11-02T00:47:45.291Z"
draft: true
url: ./
description: "I am really loving TypeScript and Deno."

---

## I'm Loving Deno (and TypeScript)
So a few months ago I stumbled upon some YouTube videos talking about Deno and Bun (and obviously Node.js),
specifically why they were created and how they solve all the issues with Node. I haven't written much
JavaScript since CoffeeScript dropped, didn't appeciate Node or the eco-system, and generally spend most of
my time building tooling out in PowerShell and Python so I wasn't completely interested in JavaScript... But
some of Deno's features had me interested; Namely speed, intellisense support, binary compilation, security 
features, Node support, and the kv store.

## Projects
One of the first things I did with deno, after writing a few very basic test scripts, was to dig into Lume and
rebuild my GitHub Pages blog as a Deno Deploy hosted app (while still technically being static). My approach to
learing was to throw things at the wall to see what sticks, but I had the motivation and it led me to write the
lumepost script and learning to build cli apps. I'm in the process of replacing the `Lume.serve()` example server
with an Oak server that includes a 'recently read' API, which will lead to writing the front-end JS to dynamically
load the most recent entries.

To continue messing around with creating back-end services with Deno, and armed with the motivation, I set out to
make a weather application that would specifically answer the question "can I go for a bike ride today?" that I
called Bike-NoBike.