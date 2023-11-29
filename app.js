import express from 'express'
import {getLivro, getLivros} from "./database.js"
import cors from 'cors'

/*
    Aqui ficarão as funções da API, responsáveis por receber algum pedido e
    retornar alguma resposta à interface de usuário. Não há contato direto com o
    banco de dados, sendo necessário fazer uso da database.js para tal.
*/

// Inicializa o express e habilita o cors para permitir troca de dados em um mesmo localhost com diferentes portas
const app = express()
app.use(cors());

// GET Livros. Através de uma requisição GET, retorna todos os Livros da base de dados
app.get("/livros", async (req, res) => {
    const livros = await getLivros();
    res.status(200).send(livros)
})

// GET Livros com base no isbn. Através de uma requisição GET, retorna o Livro da base de dados com o isbn correspondente
app.get("/livro/:isbn", async (req, res) => {
    const isbn = req.params.isbn
    const livro = await getLivro(isbn);
    res.status(200).send(livro)
})

// POST Livro. Cria um Livro novo na base de dados de acordo com as informações passadas
app.post("/livro", async (req, res) => {
    const {isbn, titulo, descricao, data, estado, loc, uri} = req.body
    const livro = await createLivro(isbn, titulo, descricao, data, estado, loc, uri)
    res.status(201).send(livro)
})

// Abre o servidor local na porta 3333
const port = 3333
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})