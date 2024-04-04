import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import { router as userRouter } from "./routes/userRouter.js";
import { globalErrorHandler } from "./controllers/errorController.js";

dotenv.config();

const app = express();

// MIDDLEWARE =====================
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// built-in
app.use(express.json());
app.use(cors());

// custom global middleware
app.use((req, res, next) => {
  console.log("Hello from middleware!!");

  // req.time = new Date().toLocaleString();

  next();
});

// CONTROLLERS ======================
// check server health
app.get("/ping", (req, res) => {
  // res.send('<h1>Hello from express!!</h1>');
  // res.sendStatus(200);
  res.status(200).json({
    status: "success",
    msg: "pong!",
    test: null,
  });
});

// ROUTES ==========================
const pathPrefix = "/api/v1";

app.use(`${pathPrefix}/users`, userRouter);

// handle not found error
app.all("*", (req, res) => {
  res.status(404).json({
    msg: "Oops! Resource not found!",
  });
});

app.use(globalErrorHandler);

// SERVER INIT =================
// const port = process.env.PORT ? +process.env.PORT : 3001;
const port = +process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
