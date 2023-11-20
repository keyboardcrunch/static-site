#!/usr/bin/env -S deno run -A --unstable
import "https://deno.land/x/dotenv/load.ts";
import {
    Application,
    Router,
    HttpError,
    Status,
  } from "https://deno.land/x/oak/mod.ts";

// set to remote site kv if local
const keystore = Deno.env.get("keystore") || undefined;
const apikey = Deno.env.get("DENO_KV_ACCESS_TOKEN");
Deno.env.set('DENO_KV_ACCESS_TOKEN', apikey);
const kv = await Deno.openKv(keystore);

const router = new Router();
const app = new Application();

// Error handler middleware
app.use(async (context, next) => {
    try {
      await next();
    } catch (e) {
      if (e instanceof HttpError) {
        // deno-lint-ignore no-explicit-any
        context.response.status = e.status as any;
        if (e.expose) {
          context.response.body = `<!DOCTYPE html>
              <html>
                <body>
                  <h3>${e.status} - ${e.name}</h3>
                </body>
              </html>`;
        } else {
          context.response.body = `<!DOCTYPE html>
              <html>
                <body>
                  <h1>${e.status} - ${Status[e.status]}</h1>
                </body>
              </html>`;
        }
      } else if (e instanceof Error) {
        context.response.status = 500;
        context.response.body = `<!DOCTYPE html>
              <html>
                <body>
                  <h1>500 - Internal Server Error</h1>
                </body>
              </html>`;
      }
    }
  });

router
    .get("/linkshare", async (context) => {
        const params = context.request.url.searchParams;
        const count = Number(params.get("count")) || 20;
        const resp = [];
        const links = await kv.list({ prefix: ["linkshare"]}, { limit: count, reverse: true } );
        for await (const entry of links) resp.push(entry.value);
        // set a cache header and return the results
        context.response.headers.set("Cache-Control", "max-age=86400, must-revalidate");
        context.response.body = JSON.stringify(resp);
    })

app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context) => {
    await context.send({
        root: `${Deno.cwd()}/_site`,
        index: "index.html"
    });
})

await app.listen({ 
    hostname: "127.0.0.1",
    port: 8000,
    alpnProtocols: ["h2", "http/1.1"],
});
