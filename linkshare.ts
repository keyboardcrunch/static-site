#!/usr/bin/env -S deno run -A --unstable
import "https://deno.land/x/dotenv/load.ts";
import { Command, EnumType } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const keystore = Deno.env.get("keystore") || undefined;
const token = Deno.env.get("DENO_KV_ACCESS_TOKEN")
Deno.env.set('DENO_KV_ACCESS_TOKEN', token)
const kv = await Deno.openKv(keystore);

interface Link {
    date?: string;
    title: string;
    link: string;
    tags?: string;
}

async function addLink(obj: Link) {
  if ( obj.title == "" ) {
    // fetch the page title and update the link obj
    const title = await fetch(obj.link)
      .then((response) => response.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const page_title = doc.querySelectorAll('title')[0];
        return page_title.innerText;
      })
    obj.title = title;
  }
  await kv.set(['linkshare', obj.link], obj);
}

async function delLink(url: string) {
  await kv.delete(["linkshare", url]);
} 

async function listLink(url: string, count: number) {
  if ( url == "" ) {
    const resp = [];
    const links = await kv.list({ prefix: ["linkshare"]}, { limit: count } );
    for await (const entry of links) resp.push(entry.value);
    console.log(resp);
  } else {
    const obj = kv.get(["linkshare", url]);
    console.log((await obj).value);
  }
}

// Cliffy commandline arguments setup
const action = new EnumType(["add", "modify", "remove"]);
const { options } = await new Command()
  .name("linkshare")
  .version("0.0.1")
  .description("Util to manage shared links.")
  .action((options, ...args) => console.log("main. replace. show help."))
  // add
  .command("add", "add cmd")
  .option("-t, --title <title:string>", "Link title.", { required: false })
  .option("-l, --link <link:string>", "Link address.", { required: true })
  .option("--tags <tags:string>", "Optional link tags.")
  .action((options) => {
    // TODO: make title optional and fetch it from the page
    const new_link: Link = {
      title: options.title || "",
      link: options.link,
      tags: options.tags || "",
      date: new Date().toISOString(),
    }
    addLink(new_link);
  })
  // remove
  .command("remove", "remove cmd")
  .option("-l, --link <link:string>", "Link address.", { required: true })
  .action((options) => {
    delLink(options.link);
  })
  // list
  .command("list", "list cmd")
  .option("-l, --link <link:string>", "Link address.")
  .option("-c, --count <count:number>", "Limit results.")
  .action((options) => {
    const count: number = options.count || 20;
    const link = options.link || "";
    listLink(link, count);
  })
  .parse(Deno.args);
