import mysql from "mysql2";

/* 
    Aqui ficarão as funções base do sistema. Nesta parte, as funções são responsáveis por chamar
    diretamente comandos SQL no banco de dados. Verificações, processamento, etc. devem ser feitas
    na camada de backend, no app.js. 
*/

// Cria a conexão com a base de dados local (ip 127.0.0.1)
const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "080402",
    database: "projeto_db",
  })
  .promise();

/* 
----------------------------------------------------------------
    Aqui ficarão as funções para a tabela dos LIVROS.
----------------------------------------------------------------
*/

/* 
--------------------------------
    Requests do tipo GET
--------------------------------
*/

// Função que faz a query para buscar todos os Livros do DB
export async function getLivros() {
  const [result] = await pool.query("SELECT * FROM Livros");
  return result;
}

// Função que faz a query para buscar os livros baseado no parametro
export async function getBuscalivro(parametro, dados) {
  const [result] = await pool.query(
    `SELECT * FROM Livros WHERE ${parametro} = "${dados}"`
  );
  return result;
}

export async function getAutor(autor) {
  const [result] = await pool.query("SELECT isbn FROM Autor WHERE autor = ?", [
    autor,
  ]);
  return result;
}

export async function getCategorialivro(categoria) {
  const [result] = await pool.query(
    "SELECT isbn FROM categoria_dos_livros WHERE categoria = ?",
    [categoria]
  );
  return result;
}

export async function getLivroByCategoria(categoria) {
  const [result] = await pool.query(
    `
    SELECT Livros.isbn,
           Livros.titulo,
           Livros.descricao,
           Livros.data_de_aquisicao,
           Livros.estado_de_conservacao,
           Livros.localizacao_fisica,
           Livros.uri_da_capa_do_livro
    FROM Livros, categoria_dos_livros
    WHERE Livros.isbn = categoria_dos_livros.isbn AND categoria_dos_livros.categoria = ?`,
    [categoria]
  );
  return result;
}

export async function getLivroByAutor(autor) {
  const [result] = await pool.query(
    `
    SELECT Livros.isbn,
           Livros.titulo,
           Livros.descricao,
           Livros.data_de_aquisicao,
           Livros.estado_de_conservacao,
           Livros.localizacao_fisica,
           Livros.uri_da_capa_do_livro
    FROM Livros, Autor
    WHERE Livros.isbn = Autor.isbn AND Autor.name = ?`,
    [autor]
  );
  return result;
}

/* 
--------------------------------
    Requests do tipo POST
--------------------------------
*/

// Função que cria livro
export async function createLivro(
  isbn,
  titulo,
  descricao,
  data_de_aquisicao,
  estado_de_conservacao,
  localizacao_fisica,
  uri_da_capa_do_livro
) {
  const result = await pool.query(
    `
    INSERT INTO Livros (isbn,
                        titulo,
                        descricao,
                        data_de_aquisicao,
                        estado_de_conservacao,
                        localizacao_fisica,
                        uri_da_capa_do_livro)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      isbn,
      titulo,
      descricao,
      data_de_aquisicao,
      estado_de_conservacao,
      localizacao_fisica,
      uri_da_capa_do_livro,
    ]
  );
  return result;
}

/* 
--------------------------------
    Requests do tipo PUT
--------------------------------
*/

export async function editLivro(
  isbn,
  titulo,
  descricao,
  data_de_aquisicao,
  estado_de_conservacao,
  localizacao_fisica,
  uri_da_capa_do_livro
) {
  const result = await pool.query(
    `
    UPDATE Livros
    SET 
        isbn = ?,
        titulo = ?,
        descricao = ?,
        data_de_aquisicao = ?,
        estado_de_conservacao = ?,
        localizacao_fisica = ?,
        uri_da_capa_do_livro = ?
    WHERE
        isbn = ?;
    `,
    [
      isbn,
      titulo,
      descricao,
      data_de_aquisicao,
      estado_de_conservacao,
      localizacao_fisica,
      uri_da_capa_do_livro,
      isbn,
    ]
  );
  return result;
}

/* 
--------------------------------
    Requests do tipo DELETE
--------------------------------
*/

export async function deleteLivro(isbn) {
  const result = await pool.query(
    `
    DELETE FROM Livros
    WHERE isbn = ?;
    `,
    [isbn]
  );
  return result;
}

/* 
----------------------------------------------------------------
    Aqui ficarão as funções para a tabela dos MATERIAIS.
----------------------------------------------------------------
*/

/* 
--------------------------------
    Requests do tipo GET
--------------------------------
*/

// Função que faz a query para buscar todos os materiais do DB
export async function getMateriais() {
  const [result] = await pool.query("SELECT * FROM Materiais_Didaticos");
  return result;
}

// Função que faz a query para buscar os materiais baseado no parametro
export async function getBuscaMateriais(parametro, dados) {
  const [result] = await pool.query(
    `SELECT * FROM Materiais_Didaticos WHERE ${parametro} = "${dados}"`
  );
  return result;
}

export async function getCategoriaMaterial(categoria) {
  const [result] = await pool.query(
    "SELECT id FROM categoria_dos_materiais WHERE categoria = ?",
    [categoria]
  );
  return result;
}

/* 
--------------------------------
    Requests do tipo POST
--------------------------------
*/

export async function createMaterial(
  id,
  descricao,
  numero_de_serie,
  data_de_aquisicao,
  estado_de_conservacao,
  localizacao_fisica,
  uri_da_foto_do_material
) {
  const result = await pool.query(
    `
    INSERT INTO Materiais_Didaticos (
        id,
        descricao,
        numero_de_serie,
        data_de_aquisicao,
        estado_de_conservacao,
        localizacao_fisica,
        uri_da_foto_do_material)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      id,
      descricao,
      numero_de_serie,
      data_de_aquisicao,
      estado_de_conservacao,
      localizacao_fisica,
      uri_da_foto_do_material,
    ]
  );
  return result;
}

/* 
--------------------------------
    Requests do tipo PUT
--------------------------------
*/

export async function editMaterial(
  id,
  descricao,
  numero_de_serie,
  data_de_aquisicao,
  estado_de_conservacao,
  localizacao_fisica,
  uri_da_foto_do_material
) {
  const result = await pool.query(
    `
    UPDATE Materiais_Didaticos
    SET 
        id = ?,
        descricao = ?,
        numero_de_serie = ?,
        data_de_aquisicao = ?,
        estado_de_conservacao = ?,
        localizacao_fisica = ?,
        uri_da_foto_do_material = ?
    WHERE
        id = ?;
    `,
    [
      id,
      descricao,
      numero_de_serie,
      data_de_aquisicao,
      estado_de_conservacao,
      localizacao_fisica,
      uri_da_foto_do_material,
      id,
    ]
  );
  return result;
}

/* 
--------------------------------
    Requests do tipo DELETE
--------------------------------
*/

export async function deleteMaterial(id) {
  const result = await pool.query(
    `
    DELETE FROM Materiais_Didaticos
    WHERE id = ?;
    `,
    [id]
  );
  return result;
}

/* 
----------------------------------------------------------------
    Aqui ficarão as funções para a tabela dos USUARIOS.
----------------------------------------------------------------
*/

/* 
--------------------------------
    Requests do tipo GET
--------------------------------
*/

// Função que faz a query para buscar todos os usuarios do DB
export async function getUsers() {
  const [result] = await pool.query("SELECT * FROM Usuarios");
  return result;
}

export async function getUserByLogin(login) {
  const [result] = await pool.query("SELECT * FROM Usuarios WHERE login = ?", [
    login,
  ]);
  return result;
}

/* 
--------------------------------
    Requests do tipo POST
--------------------------------
*/

export async function createUser(
  id,
  nome,
  sobrenome,
  funcao,
  login,
  senha,
  uri_da_foto_do_usuario
) {
  const [result] = await pool.query("INSERT INTO Usuarios SET ?", {
    id: id,
    nome: nome,
    sobrenome: sobrenome,
    funcao: funcao,
    login: login,
    senha: senha,
    uri_da_foto_do_usuario: uri_da_foto_do_usuario,
  });
  return result;
}

/* 
--------------------------------
    Requests do tipo PUT
--------------------------------
*/

export async function editUser(
  id,
  nome,
  sobrenome,
  funcao,
  login,
  senha,
  uri_da_foto_do_usuario
) {
  const result = await pool.query(
    `
    UPDATE Usuarios
    SET 
        id = ?,
        nome = ?,
        sobrenome = ?,
        funcao = ?,
        login = ?,
        senha = ?,
        uri_da_foto_do_usuario = ?
    WHERE
        id = ?;
    `,
    [id, nome, sobrenome, funcao, login, senha, uri_da_foto_do_usuario, id]
  );
  return result;
}

/* 
--------------------------------
    Requests do tipo DELETE
--------------------------------
*/

export async function deleteUser(id) {
  const result = await pool.query(
    `
    DELETE FROM Usuarios
    WHERE id = ?;
    `,
    [id]
  );
  return result;
}

/* 
----------------------------------------------------------------
    Aqui ficarão as funções para a tabela dos EMPRESTIMOS.
----------------------------------------------------------------
*/

// Busca todos os emprestimos
export async function getEmprestimo() {
  const [result] = await pool.query("SELECT * FROM Emprestimos");
  return result;
}

// Cria emprestimos
export async function createEmprestimo(
  id_do_livro,
  id_do_material,
  id_do_usuario,
  data_do_emprestimo,
  data_de_devolucao_prevista,
  status_do_emprestimo
) {
  const result = await pool.query(
    `
    INSERT INTO Emprestimos (id_do_livro,
                        id_do_material,
                        id_do_usuario,
                        data_do_emprestimo,
                        data_de_devolucao_prevista,
                        status_do_emprestimo)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      id_do_livro,
      id_do_material,
      id_do_usuario,
      data_do_emprestimo,
      data_de_devolucao_prevista,
      status_do_emprestimo,
    ]
  );
  return result;
}

// atualiza data de emprestimo
export async function atualizaEmprestimo(id_do_livro, date) {
  const [result] = await pool.query(
    `UPDATE Emprestimos SET data_de_devolucao_prevista = "${date}" WHERE id_do_livro = "${id_do_livro}"`
  );
  return result;
}

export async function updateEmprestimoStatus(id, status, type) {
  let id_type;
  switch (type) {
    case "material":
      id_type = "id_do_material";
      break;
    case "livro":
      id_type = "id_do_livro";
      break;
    default:
      return "Not a valid id type";
  }
  const [result] = await pool.query(
    `UPDATE Emprestimos SET status_do_emprestimo = "${status}" WHERE ${id_type} = "${id}"`
  );
  return result;
}

export async function getEmprestimoByParameter(parameter, value) {
  const [result] = await pool.query(
    `SELECT * FROM Emprestimos WHERE ${parameter} = ?`,
    [value]
  );
  return result;
}

export async function getEmprestimoByMaterial(id) {
  const [result] = await pool.query(
    "SELECT * FROM Emprestimos WHERE id_do_material = ?",
    [id]
  );
  return result;
}

export async function getEmprestimoByUser(id) {
  const [result] = await pool.query(
    "SELECT * FROM Emprestimos WHERE id_do_usuario = ?",
    [id]
  );
  return result;
}
