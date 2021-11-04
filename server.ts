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
          let home = Deno.readFile("./index.html");

          let res = new Response(await home, {
            headers: {
              "content-type": "text/html; charset=UTF-8",
            },
          });

          await request.respondWith(res);
        }
      }
    })();

  } catch (err) {
    break;
  }
}
