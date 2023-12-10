import express from 'express'
import * as db from "./database.js"
import cors from 'cors'
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import {isAuthorized} from './app/middleware/auth.js'

/*
    Aqui ficarão as funções da API, responsáveis por receber algum pedido e
    retornar alguma resposta à interface de usuário. Não há contato direto com o
    banco de dados, sendo necessário fazer uso da database.js para tal.
*/

// Inicializa o express e habilita o cors para permitir troca de dados em um mesmo localhost com diferentes portas
const app = express()
app.use(cors());
app.use(express.json())
app.use(cookieParser())
/*
    Aqui ficarão as funções para a tabela dos livros.
*/

// GET Livros. Através de uma requisição GET, retorna todos os Livros da base de dados
app.get("/livros", async (req, res) => {
    const livros = await db.getLivros();
    res.status(200).send(livros)
})

// GET Livros com base no isbn. Através de uma requisição GET, retorna o Livro da base de dados com o isbn correspondente
app.get("/livro/byIsbn/:isbn", async (req, res) => {
    const isbn = req.params.isbn
    const livro = await db.getBuscalivro("isbn", isbn);
    res.status(200).send(livro)
})

// GET Livros com base no titulo. Através de uma requisição GET, retorna o Livro da base de dados com o titulo correspondente
app.get("/livro/byTitle/:titulo", async (req, res) => {
    const titulo = req.params.titulo
    const livro = await db.getBuscalivro("titulo", titulo);
    res.status(200).send(livro)
})

app.get("/livro/byCategory/:categoria", async (req, res) => {
    const category = req.params.categoria
    const result = await db.getLivroByCategoria(category)
    res.status(200).send(result)
})

app.get("/livro/byAuthor/:autor", async (req, res) => {
    const category = req.params.autor
    const result = await db.getLivroByAutor(autor)
    res.status(200).send(result)
})

// GET isbn com base no autor. Através de uma requisição GET, retorna o isbn da base de dados com o autor correspondente
app.get("/autor/:autor", async (req, res) => {
    const autor = req.params.autor
    const livro = await db.getAutor(autor);
    res.status(200).send(livro)
})

// GET isbn com base no categoria. Através de uma requisição GET, retorna o isbn da base de dados com o categoria correspondente
app.get("/categoria/:categoria", async (req, res) => {
    const categoria = req.params.categoria
    const livro = await db.getCategorialivro(categoria);
    res.status(200).send(livro)
})


// POST Livro. Cria um Livro novo na base de dados de acordo com as informações passadas
app.post("/livro", isAuthorized, async (req, res) => {
    if (!req.user || req.user.funcao != "administrador") {
        return res.status(401).send("Somente administradores podem criar novos livros.")
    }
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
app.get("/material/byId/:id", async (req, res) => {
    const id = req.params.id
    const material = await db.getBuscaMateriais("id", id);
    res.status(200).send(material)
})

// GET Materiais com base no id. Através de uma requisição GET, retorna o Material da base de dados com o id correspondente
app.get("/material/byDesc/:descricao", async (req, res) => {
    const descricao = req.params.descricao
    const material = await db.getBuscaMateriais("descricao", descricao);
    res.status(200).send(material)
})

app.get("/material/bySerialNumber/:numero_de_serie", async (req, res) => {
    const numero_de_serie = req.params.numero_de_serie
    const material = await db.getBuscaMateriais("numero_de_serie", numero_de_serie);
    res.status(200).send(material)
})

app.get("/material/byConservation/:estado_de_conservação", async (req, res) => {
    const estado_de_conservação = req.params.estado_de_conservação
    const material = await db.getBuscaMateriais("estado_de_conservação", estado_de_conservação);
    res.status(200).send(material)
})

// POST Materiais. Cria um Materiais novo na base de dados de acordo com as informações passadas
app.post("/material", isAuthorized, async (req, res) => {
    if (!req.user || req.user.funcao != "administrador") {
        return res.status(401).send("Somente administradores podem criar novos materiais.")
    }
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

app.get("/emprestimos/byLivroIsbn/:isbn", async (req, res) => {
    const isbn = req.params.isbn
    const emprestimos = await db.getEmprestimoByParameter("id_do_livro", isbn);
    res.status(200).send(emprestimos)
})

app.get("/emprestimos/byMaterialId/:id", async (req, res) => {
    const id = req.params.id
    const emprestimos = await db.getEmprestimoByParameter("id_do_material", id);
    res.status(200).send(emprestimos)
})

app.get("/emprestimos/byUserId/:id", async (req, res) => {
    const id = req.params.id
    const emprestimos = await db.getEmprestimoByParameter("id_do_usuario", id);
    res.status(200).send(emprestimos)
})

// POST Emprestimos. Cria um Emprestimos novo na base de dados de acordo com as informações passadas
app.post("/emprestimo", async (req, res) => {
    const {id_do_livro, id_do_material, id_do_usuario, tipo_do_item, data_do_emprestimo, data_de_devolucao_prevista, status_do_emprestimo} = req.body
    const emprestimos = await db.createEmprestimo(id_do_livro, id_do_material, id_do_usuario, tipo_do_item, data_do_emprestimo, data_de_devolucao_prevista, status_do_emprestimo)
    res.status(201).send(emprestimos)
})

app.post("/emprestimo/updateStatus", async (req, res) => {
    const {id, status, type} = req.body
    const emprestimo = await db.updateEmprestimoStatus(id, status, type)
    res.status(201).send(emprestimo)
})

app.post("/register", isAuthorized, async (req, res) => {
    const {id,
           nome,
           sobrenome,
           funcao,
           login,
           senha,
           uri_da_foto_do_usuario} = req.body;

    // Isso tudo deveria ser feito por um controller separado. Futura refatoração vai mexer aqui.
    if (!req.user || req.user.funcao != "administrador") {
        return res.status(401).send("Somente administradores podem criar novos usuários.")
    }
    const users = await db.getUserByLogin(login)
    if (users.length() > 0) {
        return res.status(409).send("Login já está em uso!")
    }

    let hashedPassword = await bcrypt.hash(senha, 8)
    const result = db.createUser(id, nome, sobrenome, funcao, login, hashedPassword, uri_da_foto_do_usuario)

    res.status(201).send(result)
})

app.post("/login", async (req, res) => {
    const {login, senha} = req.body
    const users = await db.getUserByLogin(login)
    if (!users || !await bcrypt.compare(senha, users[0].senha)) {
        res.status(401).send("Login ou senha inválidos.")
    }
    const id = users[0].id
    const token = jwt.sign({ id }, "abcdefghijklmnopqrstuvwxyz123456", {
        expiresIn: 90
    });
    const cookieOptions = {
        expires: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    res.cookie('userSave', token, cookieOptions);
    res.status(200)
})

app.get("/logout", (req, res) => {
    res.cookie('userSave', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    })
    res.status(200)
})


// Abre o servidor local na porta 3333
const port = 3333
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
