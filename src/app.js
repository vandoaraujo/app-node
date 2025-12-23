import express from "express";
import routes from "./routes/index.js";

const app = express();
//Todas as requisicoes serao feitas pelo express e tratadas como json
routes(app);

console.log('Rodando....')

export default app;