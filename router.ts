export const route = (route:string, path: string) => {
  let regexRoute = new RegExp(route, "gmi");
  return regexRoute.test(path);
}
