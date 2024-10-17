import { createServer } from "./server";
import config from "./config";

const server = createServer();

server.listen(config.port, () => {
  console.log(`api running on ${config.port}`);
});
