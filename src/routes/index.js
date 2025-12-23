import express from "express";
import livrosRoutes from "./livrosRoutes.js";
import autoresRoutes from "./autoresRoutes.js";
import loginRoute from "./loginRoute.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ title: "Usando Routes - Curso de Node.js" });
  });

  app.use(express.json(), livrosRoutes);
  app.use(express.json(), loginRoute);
  app.use(express.json(), autoresRoutes);
};

export default routes;
