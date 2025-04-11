// Importando o modelo de livro
import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

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
    const novoLivro = req.body;

    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      if (!autorEncontrado) {
        return res.status(400).json({ message: "Autor não encontrado" });
      }
      const livroCompleto = {...novoLivro, autor: {...autorEncontrado._doc}};  
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).send({message: "livro cadastrado com sucesso", livro: livroCriado});  
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

  static async listarLivrosPorEditora (req, res) {
      const editora = req.query.editora;
      try {
        const livrosEncontrados = await livro.find({editora: editora});
        if(livrosEncontrados && livrosEncontrados.length > 0)    
          res.status(200).json(livrosEncontrados);
        else
          res.status(404).json({ message: `Nenhum livro encontrado para a editora ${id}` });
      } catch (error) {
          res.status(500).json({ message: `${error.message} - falha na busca` });
      }


  };

}

  export default LivroController