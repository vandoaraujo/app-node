import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await conectaNaDatabase();

conexao.on("error", console.log.bind(console, "Erro de conexão"));

conexao.once("open", () => {    
    console.log("Banco de dados conectado com sucesso!");   
});

const app = express();
//Todas as requisicoes serao feitas pelo express e tratadas como json
routes(app);


const livros = [
    {
        id: 1,
        titulo: "Senhor dos Aneis",
    },
    {
        id: 2, 
        titulo: "As cronicas de Narnia"
    }
]

//apagar
function buscaLivro(id) {
    return livros.findIndex(livro => {
        return livro.id === Number.parseInt(id)
    })
}

app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
})

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
})

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("Livro removido com sucesso");
})

app.post("/livros", (req, res) => {
    livros.push(req.body);
    
})

export default app;