import express from "express";
import * as db from "./database.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import { isAuthorized } from "./app/middleware/auth.js";

/*
    Aqui ficarão as funções da API, responsáveis por receber algum pedido e
    retornar alguma resposta à interface de usuário. Não há contato direto com o
    banco de dados, sendo necessário fazer uso da database.js para tal.
*/

// Inicializa o express e habilita o cors para permitir troca de dados em um mesmo localhost com diferentes portas
const app = express();
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    access_control_allow_credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
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

app.get("/autores/:isbn", async (req, res) => {
  const isbn = req.params.isbn;
  const autores = await db.listAutores(isbn);
  res.status(200).send(autores);
})

app.get("/livro-categorias/:isbn", async (req, res) => {
  const isbn = req.params.isbn;
  const categorias = await db.listLivroCategorias(isbn);
  res.status(200).send(categorias);
})

/* 
--------------------------------
    Requests do tipo POST
--------------------------------
*/

// POST Livro. Cria um Livro novo na base de dados de acordo com as informações passadas
app.post("/livro", isAuthorized, async (req, res) => {
  const {
    isbn,
    titulo,
    descricao,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_capa_do_livro,
    status_do_livro,
    categorias,
    autores,
  } = req.body;

  try {
    await db.createLivro(
      isbn,
      titulo,
      descricao,
      data_de_aquisicao,
      estado_de_conservacao,
      localizacao_fisica,
      uri_da_capa_do_livro,
      status_do_livro,
      categorias,
      autores
    );
    res.status(201).send({ message: "Livro criado com sucesso." });
  } catch (err) {
    return res.status(400).send({ error: err.sqlMessage });
  }
});

/* 
--------------------------------
    Requests do tipo PUT
--------------------------------
*/

app.put("/livro/:isbn", isAuthorized, async (req, res) => {
  const isbn = req.params.isbn;
  const {
    titulo,
    descricao,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_capa_do_livro,
    status_do_livro,
    categorias,
    autores,
  } = req.body;

  try {
    await db.editLivro(
      isbn,
      titulo,
      descricao,
      data_de_aquisicao,
      estado_de_conservacao,
      localizacao_fisica,
      uri_da_capa_do_livro,
      status_do_livro,
      categorias,
      autores
    );
    res.status(200).send({ message: "Livro atualizado com sucesso." });
  } catch (err) {
    res.status(400).send({ error: err.sqlMessage });
  }
});

/* 
--------------------------------
    Requests do tipo DELETE
--------------------------------
*/

app.delete("/livro/:isbn", isAuthorized, async (req, res) => {
  const isbn = req.params.isbn;
  const livro = await db.deleteLivro(isbn);
  res.status(200).send({message: "Livro deletado com sucesso."});
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

app.get("/material-categorias/:id", async (req, res) => {
  const id = req.params.id;
  const categorias = await db.listMaterialCategorias(id);
  res.status(200).send(categorias);
})

/* 
--------------------------------
    Requests do tipo POST
--------------------------------
*/

// POST Materiais. Cria um Materiais novo na base de dados de acordo com as informações passadas
app.post("/material", isAuthorized, async (req, res) => {
  const {
    id,
    descricao,
    numero_de_serie,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_foto_do_material,
    status_do_material,
    categorias,
  } = req.body;

  try {
    await db.createMaterial(
      id,
      descricao,
      numero_de_serie,
      data_de_aquisicao,
      estado_de_conservacao,
      localizacao_fisica,
      uri_da_foto_do_material,
      status_do_material,
      categorias
    );
    res.status(201).send({ message: "Material criado com sucesso." });
  } catch (err) {
    res.status(400).send({ error: err.sqlMessage });
  }
});

/* 
--------------------------------
    Requests do tipo PUT
--------------------------------
*/

app.put("/material/:id", isAuthorized, async (req, res) => {
  const id = req.params.id;
  const {
    descricao,
    numero_de_serie,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_foto_do_material,
    status_do_material,
    categorias,
  } = req.body;

  try {
    await db.editMaterial(
      id,
      descricao,
      numero_de_serie,
      data_de_aquisicao,
      estado_de_conservacao,
      localizacao_fisica,
      uri_da_foto_do_material,
      status_do_material,
      categorias
    );
    res.status(200).send({ message: "Material editado com sucesso." });
  } catch (err) {
    res.status(400).send({ error: err.sqlMessage });
  }
});

/* 
--------------------------------
    Requests do tipo DELETE
--------------------------------
*/

app.delete("/material/:id", isAuthorized, async (req, res) => {
  const id = req.params.id;
  const material = await db.deleteMaterial(id);
  res.status(200).send({message: "Material deletado com sucesso."});
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

app.post("/register",  async (req, res) => {
    const {id,
           nome,
           sobrenome,
           funcao,
           login,
           senha,
           uri_da_foto_do_usuario} = req.body;
    const users = await db.getUserByLogin(login)
    if (users.length > 0) {
        return res.status(409).send({message: "Login já está em uso!"})
    }

    let hashedPassword = await bcrypt.hash(senha, 8)
    console.log(hashedPassword);
    const result = db.createUser(id, nome, sobrenome, funcao, login, hashedPassword, uri_da_foto_do_usuario)
    res.status(201).send({message: "Usuário criado com sucesso."})
})

/* 
--------------------------------
    Requests do tipo PUT
--------------------------------
*/

app.put("/usuario/:id", isAuthorized, async (req, res) => {
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
  res.status(200).send({message: "Usuário editado com sucesso."});
});

/* 
--------------------------------
    Requests do tipo DELETE
--------------------------------
*/

app.delete("/usuario/:id", isAuthorized, async (req, res) => {
  const id = req.params.id;
  const usuario = await db.deleteUser(id);
  res.status(200).send({message: "Usuário deletado com sucesso."});
});

/* 
----------------------------------------------------------------
    Aqui ficarão as funções para LOGIN
----------------------------------------------------------------
*/

app.post("/login", async (req, res) => {
    let authLevel = 0

    const {login, senha} = req.body
    const [user] = await db.getUserByLogin(login)
    console.log(user);

    if (!user || !await bcrypt.compare(senha, user.senha)) {
        return res.status(401).send("Login ou senha errados!")
    }
    const id = user.id
    const token = jwt.sign({ id }, "abcdefghijklmnopqrstuvwxyz123456", {
        expiresIn: '48h'
    });
    if (user.funcao == 'administrador') {
        authLevel = 2
    } else {
        authLevel = 1
    }
    let message = "Login realizado com sucesso!"
    res.status(200).send({authLevel, token, message, id})
})

app.get("/logout", (req, res) => {
  res.status(200).send();
});

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

  if (status_do_emprestimo != "solicitado") {
    res.status(400).send({message: "Empréstimos criados podem apenas ser solicitados e após isso aprovados por um administrador."})
  }

  if (id_do_livro) {
    await db.editLivroStatus(id_do_livro, "nao_disponivel");
  }
  else {
    await db.editMaterialStatus(id_do_material, "nao_disponivel");
  }

  const emprestimo = await db.createEmprestimo(
    id, 
    id_do_livro,
    id_do_material,
    id_do_usuario,
    data_do_emprestimo,
    data_de_devolucao_prevista,
    status_do_emprestimo
  );
  res.status(201).send({message: "Emprestimo criado com sucesso."});
});

/* 
--------------------------------
    Requests do tipo PUT
--------------------------------
*/

app.put("/emprestimo", isAuthorized, async (req, res) => {
    const {
        id,
        id_do_livro,
        id_do_material,
        id_do_usuario,
        data_do_emprestimo,
        data_de_devolucao_prevista,
        status_do_emprestimo
    } = req.body;

    const emprestimo = await db.editEmprestimo(
        id,
        id_do_livro,
        id_do_material,
        id_do_usuario,
        data_do_emprestimo,
        data_de_devolucao_prevista,
        status_do_emprestimo
    );
    res.status(200).send(emprestimo);
  });

// For updating status to "devolvido"
app.put("/status", isAuthorized, async (req, res) => {
  const {
    id,
    id_do_livro,
    id_do_material,
    id_do_usuario,
    data_do_emprestimo,
    data_de_devolucao_prevista,
    status_do_emprestimo
  } = req.body;

  if (id_do_livro) {
    await db.editLivroStatus(id_do_livro, "disponivel");
  }
  else {
    await db.editMaterialStatus(id_do_material, "disponivel");
  }

  const result = await db.editEmprestimoStatus(id);

  res.status(200).send({message: "Emprestimo atualizado com sucesso."});
});

  /* 
  --------------------------------
      Requests do tipo DELETE
  --------------------------------
  */
  
  app.delete("/emprestimo/byISBN/:id/:isbn", isAuthorized, async (req, res) => {
    const id = req.params.id
    const id_do_livro = req.params.isbn

    await db.editLivroStatus(id_do_livro, "disponivel");

    const emprestimo = await db.deleteEmprestimo(id);
    res.status(200).send({message: "Emprestimo apagado com sucesso."});
  });

  app.delete("/emprestimo/byID/:id/:id_do_material", isAuthorized, async (req, res) => {
    const id = req.params.id
    const id_do_material = req.params.id_do_material

    await db.editMaterialStatus(id_do_material, "disponivel");

    const emprestimo = await db.deleteEmprestimo(id);
    res.status(200).send({message: "Emprestimo apagado com sucesso."});
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
