import { createServer } from "./server";

const server = createServer();

server.listen(3000, () => {
  console.log(`api running on 3000`);
});
