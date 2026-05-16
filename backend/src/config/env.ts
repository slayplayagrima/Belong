import dotenv from "dotenv";

dotenv.config();

const rawPort = Number(process.env.PORT ?? 5000);

if (Number.isNaN(rawPort) || rawPort <= 0) {
  throw new Error(`Invalid PORT value: "${process.env.PORT}"`);
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: rawPort,
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
};
