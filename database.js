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
    password: '123456',
    database: 'projeto_db'
}).promise()


// Função que faz a query para buscar todos os Livros do DB
export async function getLivros() {
    const [result] = await pool.query("SELECT * FROM Livros")
    return result
}

export async function getLivro(isbn) {
    const [result] = await pool.query("SELECT * FROM Livros WHERE isbn = ?", [isbn])
    return result
}

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


export async function getMateriais() {
    const [result] = await pool.query("SELECT * FROM Materiais_Ditaticos")
    return result
}

export async function getMaterial(id) {
    const [result] = await pool.query("SELECT * FROM Materiais_Ditaticos WHERE id = ?", [id])
    return result
}

export async function createMaterial(id, descricao, numero_de_serie, data_de_aquisicao, estado_de_conservacao, localizacao_fisica, uri_da_foto_do_material) {
    const result = await pool.query(`
    INSERT INTO Livros (id,
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