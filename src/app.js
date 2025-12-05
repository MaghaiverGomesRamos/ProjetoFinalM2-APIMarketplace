import express from "express"

const app = express();

app.get("/", (req, res)=>{
    res.json({message:"Bem vindo ao servidor."});
});

export default app