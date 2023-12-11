import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditMaterial = () => {
    const [material, setMaterial] = useState({
        id: null,
        descricao: "",
        numero_de_serie: null,
        data_de_aquisicao: null,
        estado_de_conservacao: "",
        localizacao_fisica: "",
        uri_da_foto_do_material: null
    });

    const navigate = useNavigate();
    const location = useLocation();
    const materialId = location.pathname.split("/")[2];
    const [error,setError] = useState(false);

    const handleChange = (e) => {
        setMaterial((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3333/material/${materialId}`, material);
            navigate("/Materials");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    return (
        <div className="form">
            <h1 className="title"> Atualizar o material </h1>
            <input className="box_input" type="number" placeholder="ID" onChange={handleChange} name="id"/>
            <input className="box_input" type="text" placeholder="Descrição" onChange={handleChange} name="descricao"/>
            <input className="box_input" type="number" placeholder="Número de Série" onChange={handleChange} name="numero_de_serie"/>
            <input className="box_input" type="date" placeholder="Data de Aquisição" onChange={handleChange} name="data_de_aquisicao"/>
            <input className="box_input" type="text" placeholder="Estado de Conservação" onChange={handleChange} name="estado_de_conservacao"/>
            <input className="box_input" type="text" placeholder="Localização Física" onChange={handleChange} name="localizacao_fisica"/>
            <input className="box_input" type="number" placeholder="URI do Material" onChange={handleChange} name="uri_da_foto_do_material"/>
            <button onClick={handleClick}> Editar </button>
            {error && "Algo deu errado!"}
            <Link className="hyperlink"to="/Materials"> Voltar para a Página Inicial </Link>
        </div>
    )
}

export default EditMaterial