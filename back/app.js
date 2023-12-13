import express from "express";
import * as db from "./database.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
//import { isAuthorized } from "./app/middleware/auth.js";

/*
    Aqui ficarão as funções da API, responsáveis por receber algum pedido e
    retornar alguma resposta à interface de usuário. Não há contato direto com o
    banco de dados, sendo necessário fazer uso da database.js para tal.
*/

// Inicializa o express e habilita o cors para permitir troca de dados em um mesmo localhost com diferentes portas
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

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
  res.status(200).send(livros);
});

/* 
--------------------------------
    Requests do tipo POST
--------------------------------
*/

// POST Livro. Cria um Livro novo na base de dados de acordo com as informações passadas
app.post("/livro", async (req, res) => {
  const {
    isbn,
    titulo,
    descricao,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_capa_do_livro,
    status_do_livro
  } = req.body;
  const livro = await db.createLivro(
    isbn,
    titulo,
    descricao,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_capa_do_livro,
    status_do_livro
  );
  res.status(201).send(livro);
});

/* 
--------------------------------
    Requests do tipo PUT
--------------------------------
*/

app.put("/livro/:isbn", async (req, res) => {
  const isbn = req.params.isbn;
  const {
    titulo,
    descricao,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_capa_do_livro,
    status_do_livro
  } = req.body;
  const livro = await db.editLivro(
    isbn,
    titulo,
    descricao,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_capa_do_livro,
    status_do_livro
  );
  res.status(200).send(livro);
});

/* 
--------------------------------
    Requests do tipo DELETE
--------------------------------
*/

app.delete("/livro/:isbn", async (req, res) => {
  const isbn = req.params.isbn;
  const livro = await db.deleteLivro(isbn);
  res.status(200).send(livro);
});

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
  res.status(200).send(materiais);
});

/* 
--------------------------------
    Requests do tipo POST
--------------------------------
*/

// POST Materiais. Cria um Materiais novo na base de dados de acordo com as informações passadas
app.post("/material", async (req, res) => {
  const {
    id,
    descricao,
    numero_de_serie,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_foto_do_material,
    status_do_material
  } = req.body;
  const material = await db.createMaterial(
    id,
    descricao,
    numero_de_serie,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_foto_do_material,
    status_do_material
  );
  res.status(201).send(material);
});

/* 
--------------------------------
    Requests do tipo PUT
--------------------------------
*/

app.put("/material/:id", async (req, res) => {
  const id = req.params.id;
  const {
    descricao,
    numero_de_serie,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_foto_do_material,
    status_do_material
  } = req.body;
  const material = await db.editMaterial(
    id,
    descricao,
    numero_de_serie,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_foto_do_material,
    status_do_material
  );
  res.status(200).send(material);
});

/* 
--------------------------------
    Requests do tipo DELETE
--------------------------------
*/

app.delete("/material/:id", async (req, res) => {
  const id = req.params.id;
  const material = await db.deleteMaterial(id);
  res.status(200).send(material);
});

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
  res.status(200).send(usuarios);
});

/* 
--------------------------------
    Requests do tipo POST
--------------------------------
*/

app.post("/register", async (req, res) => {
  const { id, nome, sobrenome, funcao, login, senha, uri_da_foto_do_usuario } =
    req.body;
  const usuario = await db.createUser(
    id,
    nome,
    sobrenome,
    funcao,
    login,
    senha,
    uri_da_foto_do_usuario
  );
  res.status(201).send(usuario);
});

/* 
--------------------------------
    Requests do tipo PUT
--------------------------------
*/

app.put("/usuario/:id", async (req, res) => {
  const id = req.params.id;
  const { nome, sobrenome, funcao, login, senha, uri_da_foto_do_usuario } =
    req.body;
  const usuario = await db.editUser(
    id,
    nome,
    sobrenome,
    funcao,
    login,
    senha,
    uri_da_foto_do_usuario
  );
  res.status(200).send(usuario);
});

/* 
--------------------------------
    Requests do tipo DELETE
--------------------------------
*/

app.delete("/usuario/:id", async (req, res) => {
  const id = req.params.id;
  const usuario = await db.deleteUser(id);
  res.status(200).send(usuario);
});

/* 
----------------------------------------------------------------
    Aqui ficarão as funções para LOGIN
----------------------------------------------------------------
*/

// app.post("/login", async (req, res) => {
//   const { login, senha } = req.body;
//   const users = await db.getUserByLogin(login);
//   if (!users || !(await bcrypt.compare(senha, users[0].senha))) {
//     res.status(401).send("Login ou senha inválidos.");
//   }
//   const id = users[0].id;
//   const token = jwt.sign({ id }, "abcdefghijklmnopqrstuvwxyz123456", {
//     expiresIn: 90,
//   });
//   const cookieOptions = {
//     expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
//     httpOnly: true,
//   };
//   res.cookie("userSave", token, cookieOptions);
//   res.status(200);
// });

// app.get("/logout", (req, res) => {
//   res.cookie("userSave", "logout", {
//     expires: new Date(Date.now() + 2 * 1000),
//     httpOnly: true,
//   });
//   res.status(200);
// });

/* 
----------------------------------------------------------------
    Aqui ficarão as funções para a tabela dos EMPRESTIMOS
----------------------------------------------------------------
*/

/* 
--------------------------------
    Requests do tipo GET
--------------------------------
*/

// GET Emprestimos. Através de uma requisição GET, retorna todos os Emprestimos da base de dados
app.get("/emprestimos", async (req, res) => {
  const emprestimos = await db.getEmprestimo();
  res.status(200).send(emprestimos);
});

/* 
--------------------------------
    Requests do tipo POST
--------------------------------
*/

// POST Emprestimos. Cria um Emprestimos novo na base de dados de acordo com as informações passadas
app.post("/emprestimo", async (req, res) => {
  const {
    id, 
    id_do_livro,
    id_do_material,
    id_do_usuario,
    data_do_emprestimo,
    data_de_devolucao_prevista,
    status_do_emprestimo,
  } = req.body;
  const emprestimo = await db.createEmprestimo(
    id, 
    id_do_livro,
    id_do_material,
    id_do_usuario,
    data_do_emprestimo,
    data_de_devolucao_prevista,
    status_do_emprestimo
  );
  res.status(201).send(emprestimo);
});

/* 
--------------------------------
    Requests do tipo PUT
--------------------------------
*/

app.put("/emprestimo/:id", async (req, res) => {
    const id = req.params.id;
    const {
        id_do_livro,
        id_do_material,
        id_do_usuario,
        data_do_emprestimo,
        data_de_devolucao_prevista,
        status_do_emprestimo
    } = req.body;

    const emprestimos = await db.editEmprestimo(
        id,
        id_do_livro,
        id_do_material,
        id_do_usuario,
        data_do_emprestimo,
        data_de_devolucao_prevista,
        status_do_emprestimo
    );
    res.status(200).send(emprestimos);
  });
  
  /* 
  --------------------------------
      Requests do tipo DELETE
  --------------------------------
  */
  
  app.delete("/emprestimo/:id", async (req, res) => {
    const id = req.params.id;
    const emprestimo = await db.deleteUser(id);
    res.status(200).send(emprestimo);
  });

/* 
----------------------------------------------------------------
    FIM das funções
----------------------------------------------------------------
*/

// Abre o servidor local na porta 3333
const port = 3333;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
