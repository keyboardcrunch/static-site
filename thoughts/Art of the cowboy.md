---
title: Art of the cowboy
short_title: Don't be a cowboy
date: "2023-07-21T00:38:59.739Z"
draft: false
description: "Developers vs Cowboys, the arts of putting things on the internet."
---

# Developers vs Cowboys, the arts of putting things on the internet.

Being that my day job, hobbies, and interests are all intersecting with security... I read a lot of "news" about security related events and "hackers". Something I'm frequently reading and shaking my head at is the old narrative of 
```
"Hackers are exploiting $X thousand $SOFTWARE servers that developers unknowingly exposed to the internet without security controls."
```
And without directly calling out specific posts or the existence of Redis servers facing the public internet, I'd like to introduce my definition of these _administrators_ and _developers_. I call them **cowboys**.
```
Cowboy'ing (verb)
The act of taking on or working a project, and executing on it without taking the steps of understanding the components or their implications.

Example: Brian cloned an app off Github for a company project and cowboy'd some shit together, including an internet facing Redis server.

Synonym: Yolo'ing
```

I just find it hard to believe that any self respecting developer would expose a server to the internet that had no visible authentication methods and required commenting out a line of a config file that included a warning immediately above it. But in general us folks of the IT and Information Security variety see on a daily basis the results of others "cowboy-ing" shit into existence, and we get the pressures and deadlines. 

But RTFM.