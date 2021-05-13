import { fetcher, SEARCH_KEY } from "./utils/api";

async function init() {
  console.log(await fetcher(SEARCH_KEY, "steak"));
}
init();
