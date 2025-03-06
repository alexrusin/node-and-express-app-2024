import "module-alias/register";
import "reflect-metadata";
import { createServer } from "./server";
import config from "./config";

const server = createServer();

server.listen(config.port, () => {
  console.log(`api running on ${config.port}`);
});
