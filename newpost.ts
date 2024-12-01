#!/usr/bin/env -S deno run --allow-write --allow-read

import { Command, EnumType } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import * as path from "https://deno.land/std@0.192.0/path/mod.ts";
import { existsSync } from "https://deno.land/std@0.192.0/fs/mod.ts";
import { json2yaml } from "https://deno.land/x/json2yaml@v1.0.1/mod.ts";

// Variable setup for the util
const timestamp = new Date().toISOString();
const postType = new EnumType(["post", "digest"]);
const postPath = "./posts/";
const thoughtPath = "./digests/";

interface MetaOptions {
  title: string;
  description?: string;
  date: string;
  lastmod?: string;
  draft: boolean;
  url?: string;
  short_title?: string;
}

// Cliffy commandline arguments setup
const { options } = await new Command()
  .name("newpost")
  .version("1.0.2")
  .description("Util to create a new Lume post or digest.")
  .type("post-type", postType)
  .option("-n, --new <post:post-type>", "Create a new post or digest.", {
    required: true,
  })
  .option("-t, --title <title:string>", "Post title.", { required: true })
  .option("-st, --short <description:string>", "Optional short title.")
  .option("-d, --desc <description:string>", "Optional post description.")
  .option(
    "-c, --contained",
    "Self-contained folder for post. Adds url: ./ meta.",
  )
  .parse(Deno.args);

// Building out our post configuration metadata
const config: MetaOptions = {
  title: "",
  short_title: "",
  date: timestamp,
  description: "",
  draft: true,
};

// TODO: clean-up title for file vs metadata/presentation
if (options.title) config.title = options.title;
if (options.short) {
  config.short_title = options.short
} else {
  config.short_title = options.title;
}
if (options.contained) config.url = "./";
config.description = options.desc || "";

const meta = json2yaml(JSON.stringify(config));
const yaml = "---\r\n" + meta + "\r---\r\n";
const filename = config.title;

// Create the new post
if (options.new == "post") {
  let filepath = path.resolve(path.join(postPath, filename));
  if (options.contained) {
    try {
      if (! existsSync(filepath) ) { Deno.mkdir(filepath);}
      filepath = path.join(filepath, filename + ".md");
    } catch {
      console.log("%cFailed to create contained post.", "color:red, font-weight:bold");
      console.log(filepath)
    }
  }
  if (existsSync(filepath)) {
    console.log("%cPost already exists:", "color:red; font-weight: bold");
    console.log(filepath);
  } else {
    try {
      await Deno.writeTextFile(filepath, yaml);
      console.log("%cCreated new post:", "color:green; font-weight:bold");
      console.log(filepath);
    } catch {
      console.log(
        "%cFailed! Missing permissions or path.",
        "color:red; font-weight:bold",
      );
      console.log(filepath);
    }
  }
}

// Create the new 'digest'
if (options.new == "digest") {
  let filepath = path.resolve(path.join(thoughtPath, filename));
  if (options.contained) {
    try {
      if (! existsSync(filepath) ) { Deno.mkdir(filepath);}
      filepath = path.join(filepath, filename + ".md");
    } catch {
      console.log("%cFailed to create contained post.", "color:red, font-weight:bold");
      console.log(filepath)
    }
  }
  if (existsSync(filepath)) {
    console.log("%cPost already exists:", "color:red; font-weight:bold");
    console.log(filepath);
  } else {
    try {
      await Deno.writeTextFile(filepath, yaml);
      console.log("%cCreated new 'thought':", "color:green; font-weight:bold");
      console.log(filepath);
    } catch {
      console.log(
        "%cFailed! Missing permissions or path.",
        "color:red; font-weight:bold",
      );
      console.log(filepath);
    }
  }
}
