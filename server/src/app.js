import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import ErrorHandler from "./middlewares/errorHandler.js";

export default function createApp() {
  let app = express();

  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cookieParser());

  app.use(ErrorHandler);

  return app;
}
