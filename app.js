import express from 'express'
import * as db from "./database.js"
import cors from 'cors'

/*
    Aqui ficarão as funções da API, responsáveis por receber algum pedido e
    retornar alguma resposta à interface de usuário. Não há contato direto com o
    banco de dados, sendo necessário fazer uso da database.js para tal.
*/

// Inicializa o express e habilita o cors para permitir troca de dados em um mesmo localhost com diferentes portas
const app = express()
app.use(cors());

/*
    Aqui ficarão as funções para a tabela dos livros.
*/

// GET Livros. Através de uma requisição GET, retorna todos os Livros da base de dados
app.get("/livros", async (req, res) => {
    const livros = await db.getLivros();
    res.status(200).send(livros)
})

// GET Livros com base no isbn. Através de uma requisição GET, retorna o Livro da base de dados com o isbn correspondente
app.get("/livro/:isbn", async (req, res) => {
    const isbn = req.params.isbn
    const livro = await db.getBuscalivro("isbn", isbn);
    res.status(200).send(livro)
})

// GET isbn com base no autor. Através de uma requisição GET, retorna o isbn da base de dados com o autor correspondente
app.get("/autor/:autor", async (req, res) => {
    const autor = req.params.autor
    const livro = await db.getAutorlivro(autor);
    res.status(200).send(livro)
})

// GET Livros com base no titulo. Através de uma requisição GET, retorna o Livro da base de dados com o titulo correspondente
app.get("/livro/:titulo", async (req, res) => {
    const titulo = req.params.titulo
    const livro = await db.getBuscalivro("titulo", titulo);
    res.status(200).send(livro)
})

// GET isbn com base no categoria. Através de uma requisição GET, retorna o isbn da base de dados com o categoria correspondente
app.get("/categoria_dos_livros/:categoria", async (req, res) => {
    const categoria = req.params.categoria
    const livro = await db.getCategorialivro(categoria);
    res.status(200).send(livro)
})

// POST Livro. Cria um Livro novo na base de dados de acordo com as informações passadas
app.post("/livro", async (req, res) => {
    const {isbn, titulo, descricao, data, estado, loc, uri} = req.body
    const livro = await db.createLivro(isbn, titulo, descricao, data, estado, loc, uri)
    res.status(201).send(livro)
})

/*
    Aqui ficarão as funções para a tabela dos materiais.
*/

// GET Materiais. Através de uma requisição GET, retorna todos os Materiais da base de dados
app.get("/materiais", async (req, res) => {
    const materiais = await db.getMateriais();
    res.status(200).send(materiais)
})

// GET Materiais com base no id. Através de uma requisição GET, retorna o Material da base de dados com o id correspondente
app.get("/material/:id", async (req, res) => {
    const id = req.params.id
    const material = await db.getMaterial(id);
    res.status(200).send(material)
})

// GET Materiais com base no id. Através de uma requisição GET, retorna o Material da base de dados com o id correspondente
app.get("/material/:descrição", async (req, res) => {
    const descrição = req.params.descrição
    const material = await db.getMaterial(descrição);
    res.status(200).send(material)
})

app.get("/material/:numero_de_serie", async (req, res) => {
    const numero_de_serie = req.params.numero_de_serie
    const material = await db.getMaterial(numero_de_serie);
    res.status(200).send(material)
})

app.get("/material/:estado_de_conservação", async (req, res) => {
    const estado_de_conservação = req.params.estado_de_conservação
    const material = await db.getMaterial(estado_de_conservação);
    res.status(200).send(material)
})

// POST Materiais. Cria um Materiais novo na base de dados de acordo com as informações passadas
app.post("/material", async (req, res) => {
    const {id, descricao, numero_de_serie, data_de_aquisicao, estado_de_conservacao, localizacao_fisica, uri_da_foto_do_material} = req.body
    const material = await db.createMaterial(id, descricao, numero_de_serie, data_de_aquisicao, estado_de_conservacao, localizacao_fisica, uri_da_foto_do_material)
    res.status(201).send(material)
})

/*
    Aqui ficarão as funções para a tabela dos emprestimos.
*/

// GET Emprestimos. Através de uma requisição GET, retorna todos os Emprestimos da base de dados
app.get("/emprestimos", async (req, res) => {
    const emprestimos = await db.getEmprestimo();
    res.status(200).send(emprestimos)
})

// POST Emprestimos. Cria um Emprestimos novo na base de dados de acordo com as informações passadas
app.post("/livro", async (req, res) => {
    const {id_do_livro, id_do_material, id_do_usuario, tipo_do_item, data_do_emprestimo, data_de_devolucao_prevista, status_do_emprestimo} = req.body
    const emprestimos = await db.createLivro(id_do_livro, id_do_material, id_do_usuario, tipo_do_item, data_do_emprestimo, data_de_devolucao_prevista, status_do_emprestimo)
    res.status(201).send(emprestimos)
})

// Abre o servidor local na porta 3333
const port = 3333
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
