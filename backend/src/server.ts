import { ENVIRONMENT } from "./common/config/environment";
import express, { Request, Response, NextFunction } from "express";
import AppError from "./common/utils/appError";
import { setRoutes } from "./routes/index";
import {
  catchAsync,
  handleError,
  timeoutMiddleware,
} from "./common/utils/errorHandler";
import cors from "cors";
import helmet from "helmet";
import { stream } from "./common/utils/logger";
import morgan from "morgan";
import { connectDb } from "./common/config/database";
import cookieParser from "cookie-parser";
import { Server as SocketIOServer, Socket } from "socket.io";
import http from "http";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies/auth headers
  })
);

const server = http.createServer(app);

export const io = new SocketIOServer(server, {
  cors: {
    origin: ["http://localhost:5173", "https://medconnig.netlify.app/"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  socket.on("setup", (chatID: string) => {
    socket.join(chatID);
    socket.emit("connected");
  });

  socket.on("new message", (newMessageReceived: any, chatID: string) => {
    console.log(newMessageReceived);
    socket.to(chatID).emit("message received", newMessageReceived);
  });
});

const port:  string | number = ENVIRONMENT.APP.PORT;
const appName: string | undefined = ENVIRONMENT.APP.NAME;

/**
 * App Security
 */
app.use(helmet());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.disable("x-powered-by");

// app.use(
//   cookieParser({
//     secret: ENVIRONMENT.APP.SECRET,
//     sameSite: "None", // Set SameSite to None for cross-origin cookies
//   })
// );

/**
 * Logger Middleware
 */
app.use(
  morgan(ENVIRONMENT.APP.ENV !== "local" ? "combined" : "dev", { stream })
);

// Extend Request interface to add requestTime
declare module "express-serve-static-core" {
  interface Request {
    requestTime?: string;
  }
}

// Append request time to all requests
app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

/**
 * Initialize routes
 */
app.use("/", setRoutes());

// Catch 404 and forward to error handler
// app.all(
//   "*",
//   catchAsync(async (req: Request, res: Response) => {
//     throw new AppError("Route not found", 404);
//   })
// );

/**
 * Error handler middlewares
 */
app.use(timeoutMiddleware);
app.use(handleError);

/**
 * Bootstrap server
 */
server.listen(port, () => {
  console.log(`=> ${appName} app listening on port ${port}!`);
  connectDb();
});
