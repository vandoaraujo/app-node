import { autorSchema } from "./Autor.js";
import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { type: String, required: true },
  editora: { type: String },
  preco: { type: Number },
  paginas: { type: Number },
  autor: autorSchema
}, { versionKey: false });

// Uma prática comum é utilizar mongoose.models para verificar se o modelo já está definido antes de criá-lo novamente. 
//const livro = mongoose.models.livros || mongoose.model('livros', livroSchema);

const livro = mongoose.model("livros", livroSchema);

export default livro;