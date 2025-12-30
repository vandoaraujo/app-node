import express from "express";
import routes from "./routes/index.js";
import cors from "cors"; 

const app = express();

app.use(express.json()); // Recomendado adicionar para tratar o corpo das requisições
app.use(cors()); // 2. Use o middleware
routes(app);

console.log('Rodando....')

export default app;