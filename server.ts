const server = Deno.listen({ port: 42069 });
console.log("→ running");

while (true) {
  try {
    const conn = await server.accept();

    (async () => {
      const http = Deno.serveHttp(conn);
      for await (const request of http) {

        let path = (function(){
          let paths = request.request.url.split("/");
          paths.splice(0, 3);
          let path = "/" + paths.join("/");
          if(path !== ""){
            return path;
          } else {
            return "/";
          }
        })();

        if(path === "/"){
          await request.respondWith(
            new Response(`${path}`, {
              "status": 200,
            }),
          );
        }
      }
    })();

  } catch (err) {
    break;
  }
}
