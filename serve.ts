import Server from "lume/core/server.ts";
import notFound from "lume/middlewares/not_found.ts";

const server = new Server({
    port: 8000,
    root: `${Deno.cwd()}/_site`,
});

// custom 404 page
server.use(notFound({
  root: `${Deno.cwd()}/_site`,
  page404: "/404/",
}));

server.addEventListener("start", (): void => {
  console.log("Listening on http://localhost:8000");
});

server.start();