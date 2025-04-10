// Importando o modelo de livro
import livro from "../models/Livro.js";
import express from "express";

class LivroController {

  static async listarLivros (req, res) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static async cadastrarLivro (req, res) {
    try {
      const novoLivro = await livro.create(req.body);
      res.status(201).send({message: "livro cadastrado com sucesso", livro: novoLivro});  
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao cadastrar livro` }); 
    }
    
  }

  static async listarLivroPorId (req, res) {
    const id = req.params.id;
    try {
      const livroEncontrado = await livro.findById(id);
      console.log(livroEncontrado);
      if(livroEncontrado)
        res.status(200).json(livroEncontrado);
      else
        res.status(404).json({ message: `${error.message} - Livro não encontrado` });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao encontrar livro` });   
    }
  }

  static async atualizarLivro (req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "livro atualizado" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  };

  static async excluirLivro (req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "livro excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  };

}

  export default LivroController