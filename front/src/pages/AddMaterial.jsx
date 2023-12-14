import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { headers } from "../utils/utils";
import { toast } from "react-toastify";
import {v4 as uuidv4} from 'uuid';

const AddMaterial = () => {
  const [material, setMaterial] = useState({
    id: uuidv4(),
    descricao: "",
    numero_de_serie: null,
    data_de_aquisicao: null,
    estado_de_conservacao: "",
    localizacao_fisica: "",
    status_do_material: "disponivel",
    uri_da_foto_do_material: null,
  });

  console.log(material);

  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setMaterial((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3333/material", material, { headers: headers })
        .then((res) => toast(res.data.message));
      navigate("/Materials");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1 className="title"> Adicionar novo material </h1>
      <input
        className="box_input"
        type="text"
        placeholder="Descrição"
        onChange={handleChange}
        name="descricao"
      />
      <input
        className="box_input"
        type="number"
        placeholder="Número de Série"
        onChange={handleChange}
        name="numero_de_serie"
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
        type="text"
        placeholder="URI do Material"
        onChange={handleChange}
        name="uri_da_foto_do_material"
      />
      <select
        className="box_input"
        name="status_do_material"
        value={material.status_do_material}
        onChange={handleChange}
      >
        <option value="disponivel">Disponível</option>
        <option value="nao_disponivel">Não Disponível</option>
      </select>
      <button onClick={handleClick}> Adicionar </button>
      {error && "Algo deu errado!"}
      <Link className="hyperlink" to="/Materials">
        {" "}
        Voltar para a Página Inicial{" "}
      </Link>
    </div>
  );
};

export default AddMaterial;
