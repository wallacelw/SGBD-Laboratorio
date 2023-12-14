import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { headers } from "../utils/utils";
import { toast } from "react-toastify";
import {v4 as uuidv4} from 'uuid';

const AddMaterialEmprestimo = () => {
  const location = useLocation();
  const materialId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const [loan, setLoan] = useState({
    id: uuidv4(),
    id_do_livro: null,
    id_do_material: materialId,
    id_do_usuario: localStorage.getItem("userId"),
    data_do_emprestimo: null,
    data_de_devolucao_prevista: null,
    status_do_emprestimo: "solicitado",
  });

  const handleChange = (e) => {
    setLoan((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3333/emprestimo", loan, { headers: headers })
        .then((res) => toast(res.data.message));
      navigate("/Materials");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1 className="title"> Solicite o Emprestimo </h1>
      <input
        className="box_input"
        type="date"
        placeholder="Data do Emprestimo"
        onChange={handleChange}
        name="data_do_emprestimo"
      />
      <input
        className="box_input"
        type="date"
        placeholder="Data da Devolução Prevista"
        onChange={handleChange}
        name="data_de_devolucao_prevista"
      />
      <button onClick={handleClick}> Solicitar </button>
      {error && "Algo deu errado!"}
      <Link className="hyperlink" to="/Materials">
        {" "}
        Voltar para a Página de Materiais{" "}
      </Link>
    </div>
  );
};

export default AddMaterialEmprestimo;
