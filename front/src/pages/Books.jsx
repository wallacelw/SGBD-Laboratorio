import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ListarLivros() {
  const [livros, setLivros] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [palavraChave, setPalavraChave] = useState("");
  const [livrosFiltrados, setLivrosFiltrados] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (isbn) => {
    navigate(`/Book/Add-emprestimo/${isbn}`);
  };

  const handleDelete = async (isbn) => {
    try {
      await axios.delete(`http://localhost:3333/livro/${isbn}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:3333/livros")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((livro) => {
          return {
            ...livro,
            data_de_aquisicao: new Date(
              livro.data_de_aquisicao
            ).toLocaleDateString("pt-BR"),
          };
        });
        setLivros(formattedData);
        setLivrosFiltrados(formattedData);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  useEffect(() => {
    let resultadosFiltrados;
    if (filtro === "") {
      resultadosFiltrados = [...livros];
    } else {
      resultadosFiltrados = livros.filter((livro) => {
        return livro[filtro]
          ?.toString()
          .toLowerCase()
          .includes(palavraChave.toLowerCase());
      });
    }
    setLivrosFiltrados(resultadosFiltrados);
  }, [palavraChave, filtro, livros]);

  return (
    <div>
      <h1>Lista de Livros</h1>
      <div>
        <select onChange={(e) => setFiltro(e.target.value)} value={filtro}>
          <option value="">Selecione um atributo</option>
          <option value="titulo">Título</option>
          <option value="descricao">Descrição</option>
          <option value="categorias">Categorias</option>
          <option value="data_de_aquisicao">Data de Aquisição</option>
          <option value="estado_de_conservacao">Estado de Conservação</option>
          <option value="localizacao_fisica">Localização Física</option>
          <option value="status_do_livro">Status do Livro</option>
        </select>
        <input
          type="text"
          placeholder="Digite a palavra-chave"
          value={palavraChave}
          onChange={(e) => setPalavraChave(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Categorias</th>
            <th>Data de Aquisição</th>
            <th>Estado de Conservação</th>
            <th>Localização Física</th>
            <th>Status do Livro</th>
            <th>Capa</th>
          </tr>
        </thead>
        <tbody>
          {livrosFiltrados.map((livro, index) => (
            <tr key={index}>
              <td>{livro.isbn}</td>
              <td>{livro.titulo}</td>
              <td>{livro.descricao}</td>
              <td>[]</td>
              <td>{livro.data_de_aquisicao}</td>
              <td>{livro.estado_de_conservacao}</td>
              <td>{livro.localizacao_fisica}</td>
              <td>{livro.status_do_livro}</td>
              <td>
                {livro.uri_da_capa_do_livro ? (
                  <img
                    src={livro.uri_da_capa_do_livro}
                    alt="Capa do livro "
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                ) : (
                  <span>Sem imagem</span>
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(livro.isbn)}>
                  Solicitar emprestimo
                </button>
              </td>
              <td>
                <button
                  className="delete"
                  onClick={() => handleDelete(livro.isbn)}
                >
                  {" "}
                  Apagar{" "}
                </button>
              </td>
              <td>
                <button className="edit">
                  {" "}
                  <Link to={`/Book/Edit/${livro.isbn}`}> Editar </Link>{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button_redirect">
        <Link to="/Book/Add"> Adicionar novo livro </Link>
      </button>
      <button className="button_redirect">
        <Link to="/"> Voltar para página inicial </Link>
      </button>
    </div>
  );
}

export default ListarLivros;
