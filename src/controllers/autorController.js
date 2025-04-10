// Importando o modelo de Autor.js
import { autor } from "../models/Autor.js";
import express from "express";

class AutorController {

  static async listarAutores (req, res) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static async cadastrarAutor (req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).send({message: "autor cadastrado com sucesso", autor: novoAutor});  
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao cadastrar autor` }); 
    }
    
  }

  static async listarAutorPorId (req, res) {
    const id = req.params.id;
    try {
      const autorEncontrado = await autor.findById(id);
      console.log(autorEncontrado);
      if(autorEncontrado)
        res.status(200).json(autorEncontrado);
      //else
        //res.status(404).json({ message: `${error.message} - autor não encontrado` });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao encontrar autor` });   
    }
  }

  static async atualizarAutor (req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "autor atualizado" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  };

  static async excluirAutor (req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "autor excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  };

}

  export default AutorController