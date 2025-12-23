import express from "express";
import LoginController from "../controllers/loginController.js";

const routes = express.Router();

routes.get("/login", LoginController.logar);

export default routes;