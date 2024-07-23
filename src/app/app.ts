import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "colors";

// local imports
import applicationRoutes from "./routes";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// application routes
app.use(applicationRoutes);

export default app;
