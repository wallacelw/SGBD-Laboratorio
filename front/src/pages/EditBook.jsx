import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { headers } from "../utils/utils";
import { toast } from "react-toastify";

const EditBook = () => {
  const [book, setBook] = useState({
    titulo: "",
    descricao: "",
    data_de_aquisicao: null,
    estado_de_conservacao: "",
    localizacao_fisica: "",
    status_do_livro: "disponivel",
    uri_da_capa_do_livro: null,
  });

  const [categorias, setCategorias] = useState("");
  const [autores, setAutores] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const bookIsbn = location.pathname.split("/")[3];
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...book,
        categorias: categorias.split(",").map((item) => item.trim()),
        autores: autores.split(",").map((item) => item.trim()),
      };
      await axios
        .put(`http://localhost:3333/livro/${bookIsbn}`, dataToSend, {
          headers: headers,
        })
        .then((res) => toast(res.data.message));
      navigate("/Books");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1 className="title"> Atualizar o livro </h1>
      <input
        className="box_input"
        type="text"
        placeholder="Titulo"
        onChange={handleChange}
        name="titulo"
      />
      <input
        className="box_input"
        type="text"
        placeholder="Descrição"
        onChange={handleChange}
        name="descricao"
      />
      <input
        className="box_input"
        type="date"
        placeholder="Data de Aquisição"
        onChange={handleChange}
        name="data_de_aquisicao"
      />
      <input
        className="box_input"
        type="text"
        placeholder="Estado de Conservação"
        onChange={handleChange}
        name="estado_de_conservacao"
      />
      <input
        className="box_input"
        type="text"
        placeholder="Localização Física"
        onChange={handleChange}
        name="localizacao_fisica"
      />
      <input
        className="box_input"
        type="number"
        placeholder="URI da Capa"
        onChange={handleChange}
        name="uri_da_capa_do_livro"
      />
      <input
        className="box_input"
        type="text"
        placeholder="Categorias (separadas por vírgula)"
        value={categorias}
        onChange={(e) => setCategorias(e.target.value)}
      />
      <input
        className="box_input"
        type="text"
        placeholder="Autores (separados por vírgula)"
        value={autores}
        onChange={(e) => setAutores(e.target.value)}
      />
      <select
        className="box_input"
        name="status_do_livro"
        value={book.status_do_livro}
        onChange={handleChange}
      >
        <option value="disponivel">Disponível</option>
        <option value="nao_disponivel">Não Disponível</option>
      </select>
      <button onClick={handleClick}> Editar </button>
      {error && "Algo deu errado!"}
      <Link className="hyperlink" to="/Books">
        {" "}
        Voltar para a Página Inicial{" "}
      </Link>
    </div>
  );
};

export default EditBook;
