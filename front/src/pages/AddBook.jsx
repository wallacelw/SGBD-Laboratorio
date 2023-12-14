import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { headers } from "../utils/utils";

const AddBook = () => {
  const [book, setBook] = useState({
    isbn: "",
    titulo: "",
    descricao: "",
    data_de_aquisicao: "",
    estado_de_conservacao: "",
    localizacao_fisica: "",
    uri_da_capa_do_livro: "",
    categorias: "",
    autores: "",
    status_do_livro: "disponivel",
  });

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false); // Resetando o estado de erro antes da tentativa
    try {
      const dataToSend = {
        ...book,
        categorias: book.categorias.split(",").map((item) => item.trim()),
        autores: book.autores.split(",").map((item) => item.trim()),
      };

      await axios.post("http://localhost:3333/livro", dataToSend, {
        headers: headers,
      });
      toast("Livro adicionado com sucesso!");
      navigate("/Books");
    } catch (error) {
      toast.error("Erro ao adicionar livro: " + error.message);
      setError(true); // Definindo o estado de erro em caso de falha
    }
  };

  return (
    <div className="form">
      <h1 className="title">Adicionar novo livro</h1>
      <input
        className="box_input"
        type="number"
        placeholder="ISBN"
        onChange={handleChange}
        name="isbn"
        value={book.isbn}
      />
      <input
        className="box_input"
        type="text"
        placeholder="Título"
        onChange={handleChange}
        name="titulo"
        value={book.titulo}
      />
      <input
        className="box_input"
        type="text"
        placeholder="Descrição"
        onChange={handleChange}
        name="descricao"
        value={book.descricao}
      />
      <input
        className="box_input"
        type="date"
        placeholder="Data de Aquisição"
        onChange={handleChange}
        name="data_de_aquisicao"
        value={book.data_de_aquisicao}
      />
      <input
        className="box_input"
        type="text"
        placeholder="Estado de Conservação"
        onChange={handleChange}
        name="estado_de_conservacao"
        value={book.estado_de_conservacao}
      />
      <input
        className="box_input"
        type="text"
        placeholder="Localização Física"
        onChange={handleChange}
        name="localizacao_fisica"
        value={book.localizacao_fisica}
      />
      <input
        className="box_input"
        type="text"
        placeholder="URI da Capa"
        onChange={handleChange}
        name="uri_da_capa_do_livro"
        value={book.uri_da_capa_do_livro}
      />
      <input
        className="box_input"
        type="text"
        placeholder="Categorias (separadas por vírgula)"
        onChange={handleChange}
        name="categorias"
        value={book.categorias}
      />
      <input
        className="box_input"
        type="text"
        placeholder="Autores (separados por vírgula)"
        onChange={handleChange}
        name="autores"
        value={book.autores}
      />
      <button onClick={handleSubmit}>Adicionar</button>
      {error && <p className="error_message">Algo deu errado!</p>}
      <Link className="hyperlink" to="/Books">
        Voltar para a Página Inicial
      </Link>
    </div>
  );
};

export default AddBook;
