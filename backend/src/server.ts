import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

const server = app.listen(env.port, () => {
  logger.info({ port: env.port }, "Server listening");
});

server.on("error", (err: Error) => {
  logger.error({ err }, "Server error");
});
