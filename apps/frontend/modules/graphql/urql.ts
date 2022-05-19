import { createClient } from "urql";

export const client = createClient({
  url: "https://api.thegraph.com/subgraphs/name/farreldarian/autentisk",
});
