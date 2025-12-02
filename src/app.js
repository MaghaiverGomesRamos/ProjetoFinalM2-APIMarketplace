import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", routes);

// Middleware de erro centralizado 
app.use(errorMiddleware);

export default app;
