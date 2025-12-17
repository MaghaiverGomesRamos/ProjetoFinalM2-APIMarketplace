import express from "express";
import router from "./router/index.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Bem vindo ao servidor." });
});

app.use(router);

export default app;