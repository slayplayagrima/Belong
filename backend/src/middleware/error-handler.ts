import type { ErrorRequestHandler, RequestHandler } from "express";
import { logger } from "../utils/logger.js";

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error({ err }, "Unhandled request error");

  res.status(500).json({
    message: "Internal server error",
  });
};
