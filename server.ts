import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { route } from "./router.ts";

async function handler(req: Request): Promise<any> {
  let path = (function(){
    let url = req.url.split("/"), path = "";
    url.splice(0, 3);
    for(let i = 0; i < url.length; i++){path = path.concat(`/${url[i]}`);}
    return path;
  })();

  let file, ct, f, r;

  switch(true){
    // PAGES
    case route('/x/.', path):
      f = true, r = "";
      file = Deno.readFile("./src/index.html");
      ct = "text/html; charset=UTF-8";
      break;
    case route('/x', path):
      f = true, r = "";
      file = "test";
      ct = "text/html; charset=UTF-8";
      break;

    default:
      f = true, r = "";
      file = "404";
      ct = "text/html; charset=UTF-8";
  }

  let res;

  if(f){
    res = new Response(await file, {
      headers: {
        "content-type": ct,
      },
    });
  } else {
    res = Response.redirect(r, 302);
  }

  return res;
}

await serve(handler, { addr: ":4242" });
