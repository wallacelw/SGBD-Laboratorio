import mysql from "mysql2"

/* 
    Aqui ficarão as funções base do sistema. Nesta parte, as funções são responsáveis por chamar
    diretamente comandos SQL no banco de dados. Verificações, processamento, etc. devem ser feitas
    na camada de backend, no app.js. 
*/

// Cria a conexão com a base de dados local (ip 127.0.0.1)
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Jv28042001',
    database: 'projeto_db'
}).promise()


// Função que faz a query para buscar todos os Livros do DB
export async function getLivros() {
    const [result] = await pool.query("SELECT * FROM Livros")
    return result
}

// Função que faz a query para buscar os livros baseado no parametro
export async function getBuscalivro(parametro,dados) {
    const [result] = await pool.query(`SELECT * FROM Livros WHERE ${parametro} = "${dados}"`)
    return result
}

export async function getAutorlivro(autor) {
    const [result] = await pool.query("SELECT isbn FROM Autor WHERE autor = ?", [autor])
    return result
}

export async function getCategorialivro(categoria) {
    const [result] = await pool.query("SELECT isbn FROM categoria_dos_livros WHERE categoria = ?", [categoria])
    return result
}

// Função que cria livro
export async function createLivro(isbn, titulo, descricao, data, estado, loc, uri) {
    const result = await pool.query(`
    INSERT INTO Livros (isbn,
                        titulo,
                        descricao,
                        data_de_aquisicao,
                        estado_de_conservacao,
                        localizacao_fisica,
                        uri_da_capa_do_livro)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [isbn, titulo, descricao, data, estado, loc, uri])
    return result
}

// Função que faz a query para buscar todos os materiais do DB
export async function getMateriais() {
    const [result] = await pool.query("SELECT * FROM Materiais_Ditaticos")
    return result
}

// Função que faz a query para buscar os materiais baseado no parametro
export async function getBuscamateriais(parametro,dados) {
    const [result] = await pool.query(`SELECT * FROM Materiais_Ditaticos WHERE ${parametro} = "${dados}"`)
    return result
}

export async function getCategoriamaterial(categoria) {
    const [result] = await pool.query("SELECT isbn FROM categoria_dos_materiais WHERE categoria = ?", [categoria])
    return result
}

export async function createMaterial(id, descricao, numero_de_serie, data_de_aquisicao, estado_de_conservacao, localizacao_fisica, uri_da_foto_do_material) {
    const result = await pool.query(`
    INSERT INTO Materiais_Ditaticos (id,
                        descricao,
                        numero_de_serie,
                        data_de_aquisicao,
                        estado_de_conservacao,
                        localizacao_fisica,
                        uri_da_foto_do_material)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [id, descricao, numero_de_serie, data_de_aquisicao, estado_de_conservacao, localizacao_fisica, uri_da_foto_do_material])
    return result
}

// Busca todos os emprestimos
export async function getEmprestimo() {
    const [result] = await pool.query("SELECT * FROM Emprestimos")
    return result
}

// Cria emprestimos
export async function createEmprestimo(id_do_livro, id_do_material, id_do_usuario, tipo_do_item, data_do_emprestimo, data_de_devolucao_prevista, status_do_emprestimo) {
    const result = await pool.query(`
    INSERT INTO Emprestimos (id_do_livro,
                        id_do_material,
                        id_do_usuario,
                        tipo_do_item,
                        data_do_emprestimo,
                        data_de_devolucao_prevista,
                        status_do_emprestimo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [id_do_livro, id_do_material, id_do_usuario, tipo_do_item, data_do_emprestimo, data_de_devolucao_prevista, status_do_emprestimo])
    return result
}

// atualiza data de emprestimo
export async function atualizaEmprestimo(id_do_livro, date) {
    const [result] = await pool.query(`UPDATE Emprestimos SET data_de_devolucao_prevista = "${date}" WHERE id_do_livro = "${id_do_livro}"` )
    return result
}