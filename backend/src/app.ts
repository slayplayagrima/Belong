import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import pinoHttpModule from "pino-http";
import router from "./routes/index.js";
import { logger } from "./utils/logger.js";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";

const pinoHttp = pinoHttpModule.default ?? pinoHttpModule;

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: Request) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: Response) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;