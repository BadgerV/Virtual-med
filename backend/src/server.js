import { ENVIRONMENT } from "./common/config/environment.js";
import express from "express";
import AppError from "./common/utils/appError.js";
import { setRoutes } from "./routes/index.js";
import {
  catchAsync,
  handleError,
  timeoutMiddleware,
} from "./common/utils/errorHandler.js";
import cors from "cors";
import helmet from "helmet";
import { stream } from "./common/utils/logger.js";
import morgan from "morgan";
import { connectDb } from "./common/config/database.js";
import cookieParser from "cookie-parser";
import { Server as SocketIOServer } from "socket.io";
import http from "http";

const app = express();

app.use(cors());

const server = http.createServer(app); // Use the same server for Express and Socket.IO

export const io = new SocketIOServer(server);

// io.on("connection", (socket) => {
//   console.log("a reply detected!");
// });
io.on("connection", (socket) => {
  socket.on("setup", (chatID) => {
    socket.join(chatID);
    socket.emit("connected");
  });

  socket.on("new message", (newMessageRecieved, chatID) => {
    console.log(newMessageRecieved);
    socket.to(chatID).emit("message recieved", newMessageRecieved);
  });
});

const port = ENVIRONMENT.APP.PORT;
const appName = ENVIRONMENT.APP.NAME;

/**
 * App Security
 */
app.use(helmet());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.disable("x-powered-by");

app.use(
  cookieParser({
    secret: ENVIRONMENT.APP.SECRET,
    sameSite: "None", // Set SameSite to None for cross-origin cookies
  })
);

/**
 * Logger Middleware
 */
app.use(
  morgan(ENVIRONMENT.APP.ENV !== "local" ? "combined" : "dev", { stream })
);

// append request time to all request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/**
 * Initialize routes
 */
app.use("/", setRoutes());

// catch 404 and forward to error handler
app.all(
  "*",
  catchAsync(async (req, res) => {
    throw new AppError("route not found", 404);
  })
);

/**
 * Error handler middlewares
 */
app.use(timeoutMiddleware);
app.use(handleError);

// /**
//  * status check
//  */
// app.get("*", (req, res) =>
//   res.send({
//     Time: new Date(),
//     status: "running",
//   })
// );

/**
 * Bootstrap server
 */
server.listen(port, () => {
  console.log("=> " + appName + "app listening on port " + port + "!");
  connectDb();
});
