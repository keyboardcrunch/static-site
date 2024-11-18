#!/usr/bin/env -S deno run -A --unstable-kv
import "https://deno.land/x/dotenv/load.ts";
import {
    Application,
    Router,
    HttpError,
    Status,
  } from "https://deno.land/x/oak/mod.ts";

// Setup route and application
const router = new Router();
const app = new Application();

// Error handler middleware
app.use(async (context, next) => {
    try {
      await next();
    } catch (e) {
      console.log(e.status);
      //console.log(e.status);
      if (e instanceof HttpError) {
        if (e.status === 404) {
          context.response.redirect("/404/");
          return;
        }
      }     
      else if (e instanceof Error) {
        context.response.status = 500;
        context.response.body = `<!DOCTYPE html>
              <html>
                <body>
                  <h1>500 - Internal Server Error</h1>
                </body>
              </html>`;
      } else { throw e }
    }
  });

router
    .get("/test", async (context) => {
        const params = context.request.url.searchParams;
        context.response.headers.set("Cache-Control", "max-age=86400, must-revalidate");
        context.response.body = "OK: " + params;
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
});
