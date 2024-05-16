import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "colors";

// local imports
import rootRoutes from "./routes";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// routes
app.use(rootRoutes);

export default app;
