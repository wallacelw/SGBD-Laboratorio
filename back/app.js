import express from 'express'
import * as db from "./database.js"
import cors from 'cors'
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import {isAuthorized} from './app/middleware/auth.js'
import jwt from "jsonwebtoken"
/*
    Aqui ficarão as funções da API, responsáveis por receber algum pedido e
    retornar alguma resposta à interface de usuário. Não há contato direto com o
    banco de dados, sendo necessário fazer uso da database.js para tal.
*/

// Inicializa o express e habilita o cors para permitir troca de dados em um mesmo localhost com diferentes portas
const app = express()

const corsOptions ={
    origin:'http://127.0.0.1:3000', 
    credentials:true,
    access_control_allow_credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())


/* 
----------------------------------------------------------------
    Aqui ficarão as funções para a tabela dos LIVROS
----------------------------------------------------------------
*/

/* 
--------------------------------
    Requests do tipo GET
--------------------------------
*/

// GET Livros. Através de uma requisição GET, retorna todos os Livros da base de dados
app.get("/livros", async (req, res) => {
    const livros = await db.getLivros();
    res.status(200).send(livros)
})

// // GET Livros com base no isbn. Através de uma requisição GET, retorna o Livro da base de dados com o isbn correspondente
// app.get("/livro/byIsbn/:isbn", async (req, res) => {
//     const isbn = req.params.isbn
//     const livro = await db.getBuscalivro("isbn", isbn);
//     res.status(200).send(livro)
// })

// // GET Livros com base no titulo. Através de uma requisição GET, retorna o Livro da base de dados com o titulo correspondente
// app.get("/livro/byTitle/:titulo", async (req, res) => {
//     const titulo = req.params.titulo
//     const livro = await db.getBuscalivro("titulo", titulo);
//     res.status(200).send(livro)
// })

// app.get("/livro/byCategory/:categoria", async (req, res) => {
//     const category = req.params.categoria
//     const result = await db.getLivroByCategoria(category)
//     res.status(200).send(result)
// })

// app.get("/livro/byAuthor/:autor", async (req, res) => {
//     const autor = req.params.autor
//     const result = await db.getLivroByAutor(autor)
//     res.status(200).send(result)
// })

// // GET isbn com base no autor. Através de uma requisição GET, retorna o isbn da base de dados com o autor correspondente
// app.get("/autor/:autor", async (req, res) => {
//     const autor = req.params.autor
//     const livro = await db.getAutor(autor);
//     res.status(200).send(livro)
// })

// // GET isbn com base no categoria. Através de uma requisição GET, retorna o isbn da base de dados com o categoria correspondente
// app.get("/categoria/:categoria", async (req, res) => {
//     const categoria = req.params.categoria
//     const livro = await db.getCategorialivro(categoria);
//     res.status(200).send(livro)
// })

/* 
--------------------------------
    Requests do tipo POST
--------------------------------
*/

// POST Livro. Cria um Livro novo na base de dados de acordo com as informações passadas
app.post("/livro", async (req, res) => {
    const {isbn, titulo, descricao, data_de_aquisicao, estado_de_conservacao, localizacao_fisica, uri_da_capa_do_livro} = req.body
    const livro = await db.createLivro(isbn, titulo, descricao, data_de_aquisicao, estado_de_conservacao, localizacao_fisica, uri_da_capa_do_livro)
    res.status(201).send(livro)
})

// app.post("/livro", isAuthorized, async (req, res) => {
//     if (!req.user || req.user.funcao != "administrador") {
//         return res.status(401).send("Somente administradores podem criar novos livros.")
//     }
//     const {isbn, titulo, descricao, data, estado, loc, uri} = req.body
//     const livro = await db.createLivro(isbn, titulo, descricao, data, estado, loc, uri)
//     res.status(201).send(livro)
// })

/* 
--------------------------------
    Requests do tipo PUT
--------------------------------
*/

app.put("/livro/:isbn", async (req, res) => {
    const isbn = req.params.isbn
    const {titulo, descricao, data_de_aquisicao, estado_de_conservacao, localizacao_fisica, uri_da_capa_do_livro} = req.body
    const livro = await db.editLivro(isbn, titulo, descricao, data_de_aquisicao, estado_de_conservacao, localizacao_fisica, uri_da_capa_do_livro)
    res.status(200).send(livro)
})

/* 
--------------------------------
    Requests do tipo DELETE
--------------------------------
*/

app.delete("/livro/:isbn", async (req, res) => {
    const isbn = req.params.isbn
    const livro = await db.deleteLivro(isbn)
    res.status(200).send(livro)
})


/* 
----------------------------------------------------------------
    Aqui ficarão as funções para a tabela dos Materiais
----------------------------------------------------------------
*/

/* 
--------------------------------
    Requests do tipo GET
--------------------------------
*/

// GET Materiais. Através de uma requisição GET, retorna todos os Materiais da base de dados
app.get("/materiais", async (req, res) => {
    const materiais = await db.getMateriais();
    res.status(200).send(materiais)
})

// // GET Materiais com base no id. Através de uma requisição GET, retorna o Material da base de dados com o id correspondente
// app.get("/material/byId/:id", async (req, res) => {
//     const id = req.params.id
//     const material = await db.getBuscaMateriais("id", id);
//     res.status(200).send(material)
// })

// // GET Materiais com base no id. Através de uma requisição GET, retorna o Material da base de dados com o id correspondente
// app.get("/material/byDesc/:descricao", async (req, res) => {
//     const descricao = req.params.descricao
//     const material = await db.getBuscaMateriais("descricao", descricao);
//     res.status(200).send(material)
// })

// app.get("/material/bySerialNumber/:numero_de_serie", async (req, res) => {
//     const numero_de_serie = req.params.numero_de_serie
//     const material = await db.getBuscaMateriais("numero_de_serie", numero_de_serie);
//     res.status(200).send(material)
// })

// app.get("/material/byConservation/:estado_de_conservação", async (req, res) => {
//     const estado_de_conservação = req.params.estado_de_conservação
//     const material = await db.getBuscaMateriais("estado_de_conservação", estado_de_conservação);
//     res.status(200).send(material)
// })

/* 
--------------------------------
    Requests do tipo POST
--------------------------------
*/

// POST Materiais. Cria um Materiais novo na base de dados de acordo com as informações passadas
app.post("/material", async (req, res) => {
    const {id, descricao, numero_de_serie, data_de_aquisicao, estado_de_conservacao, localizacao_fisica, uri_da_foto_do_material} = req.body
    const material = await db.createMaterial(id, descricao, numero_de_serie, data_de_aquisicao, estado_de_conservacao, localizacao_fisica, uri_da_foto_do_material)
    res.status(201).send(material)
})

// app.post("/material", isAuthorized, async (req, res) => {
//     if (!req.user || req.user.funcao != "administrador") {
//         return res.status(401).send("Somente administradores podem criar novos materiais.")
//     }
//     const {id, descricao, numero_de_serie, data_de_aquisicao, estado_de_conservacao, localizacao_fisica, uri_da_foto_do_material} = req.body
//     const material = await db.createMaterial(id, descricao, numero_de_serie, data_de_aquisicao, estado_de_conservacao, localizacao_fisica, uri_da_foto_do_material)
//     res.status(201).send(material)
// })

/* 
--------------------------------
    Requests do tipo PUT
--------------------------------
*/

app.put("/material/:id", async (req, res) => {
    const id = req.params.id
    const {descricao, numero_de_serie, data_de_aquisicao, estado_de_conservacao, localizacao_fisica, uri_da_foto_do_material} = req.body
    const material = await db.editMaterial(id, descricao, numero_de_serie, data_de_aquisicao, estado_de_conservacao, localizacao_fisica, uri_da_foto_do_material)
    res.status(200).send(material)
})

/* 
--------------------------------
    Requests do tipo DELETE
--------------------------------
*/

app.delete("/material/:id", async (req, res) => {
    const id = req.params.id
    const material = await db.deleteMaterial(id)
    res.status(200).send(material)
})


/* 
----------------------------------------------------------------
    Aqui ficarão as funções para a tabela dos USUARIOS
----------------------------------------------------------------
*/

/* 
--------------------------------
    Requests do tipo GET
--------------------------------
*/

app.get("/usuarios", async (req, res) => {
    const usuarios = await db.getUsers();
    res.status(200).send(usuarios)
})

/* 
--------------------------------
    Requests do tipo POST
--------------------------------
*/

app.post("/register", isAuthorized, async (req, res) => {
    const {id,
           nome,
           sobrenome,
           funcao,
           login,
           senha,
           uri_da_foto_do_usuario} = req.body;
    // Essa parte abaixo lida com a autenticação, checando se o usuário logado é de fato um adm.
    const user = await req.user
    if (!user || user[0].funcao != "administrador") {
        console.log(user)
        return res.status(401).send("Somente administradores podem criar novos usuários.")
    }

    const users = await db.getUserByLogin(login)
    if (users.length > 0) {
        return res.status(409).send("Login já está em uso!")
    }

    let hashedPassword = await bcrypt.hash(senha, 8)
    const result = db.createUser(id, nome, sobrenome, funcao, login, hashedPassword, uri_da_foto_do_usuario)
    res.status(201).send(result)
})

/* 
--------------------------------
    Requests do tipo PUT
--------------------------------
*/

app.put("/usuario/:id", async (req, res) => {
    const id = req.params.id
    const {nome, sobrenome, funcao, login, senha, uri_da_foto_do_usuario} = req.body
    const usuario = await db.editUser(id, nome, sobrenome, funcao, login, senha, uri_da_foto_do_usuario)
    res.status(200).send(usuario)
})

/* 
--------------------------------
    Requests do tipo DELETE
--------------------------------
*/

app.delete("/usuario/:id", async (req, res) => {
    const id = req.params.id
    const usuario = await db.deleteUser(id)
    res.status(200).send(usuario)
})

/* 
----------------------------------------------------------------
    Aqui ficarão as funções para LOGIN
----------------------------------------------------------------
*/

app.post("/login", async (req, res) => {
    let authLevel = 0

    const {login, senha} = req.body
    const [user] = await db.getUserByLogin(login)

    if (!user || !await bcrypt.compare(senha, user.senha)) {
        return res.status(401).send("Login ou senha errados!")
    }
    const id = user.id
    const token = jwt.sign({ id }, "abcdefghijklmnopqrstuvwxyz123456", {
        expiresIn: '48h'
    });
    const cookieOptions = {
        expires: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }
    res.cookie('userSave', token, cookieOptions);
    if (user.funcao == 'administrador') {
        authLevel = 2
    } else {
        authLevel = 1
    }
    res.status(200).send({authLevel, token})
})

app.post("/teste12", async (req, res) => {

})

app.get("/logout", (req, res) => {
    res.cookie('userSave', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    })
    res.status(200)
})

/* 
----------------------------------------------------------------
    Aqui ficarão as funções para a tabela dos EMPRESTIMOS
----------------------------------------------------------------
*/

// // GET Emprestimos. Através de uma requisição GET, retorna todos os Emprestimos da base de dados
// app.get("/emprestimos", async (req, res) => {
//     const emprestimos = await db.getEmprestimo();
//     res.status(200).send(emprestimos)
// })

// app.get("/emprestimos/byLivroIsbn/:isbn", async (req, res) => {
//     const isbn = req.params.isbn
//     const emprestimos = await db.getEmprestimoByParameter("id_do_livro", isbn);
//     res.status(200).send(emprestimos)
// })

// app.get("/emprestimos/byMaterialId/:id", async (req, res) => {
//     const id = req.params.id
//     const emprestimos = await db.getEmprestimoByParameter("id_do_material", id);
//     res.status(200).send(emprestimos)
// })

// app.get("/emprestimos/byUserId/:id", async (req, res) => {
//     const id = req.params.id
//     const emprestimos = await db.getEmprestimoByParameter("id_do_usuario", id);
//     res.status(200).send(emprestimos)
// })

// // POST Emprestimos. Cria um Emprestimos novo na base de dados de acordo com as informações passadas
// app.post("/emprestimo", async (req, res) => {
//     const {id_do_livro, id_do_material, id_do_usuario, tipo_do_item, data_do_emprestimo, data_de_devolucao_prevista, status_do_emprestimo} = req.body
//     const emprestimos = await db.createEmprestimo(id_do_livro, id_do_material, id_do_usuario, tipo_do_item, data_do_emprestimo, data_de_devolucao_prevista, status_do_emprestimo)
//     res.status(201).send(emprestimos)
// })

// app.post("/emprestimo/updateStatus", async (req, res) => {
//     const {id, status, type} = req.body
//     const emprestimo = await db.updateEmprestimoStatus(id, status, type)
//     res.status(201).send(emprestimo)
// })

/* 
----------------------------------------------------------------
    FIM das funções
----------------------------------------------------------------
*/

// Abre o servidor local na porta 3333
const port = 3333
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
