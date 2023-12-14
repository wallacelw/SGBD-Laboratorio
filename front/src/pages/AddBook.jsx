import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { headers } from "../utils/utils";
import { toast } from "react-toastify";

const AddBook = () => {
    const [book, setBook] = useState({
        isbn: null,
        titulo: "",
        descricao: "",
        data_de_aquisicao: null,
        estado_de_conservacao: "",
        localizacao_fisica: "",
        uri_da_capa_do_livro: null
    });

    const navigate = useNavigate();

    const [error,setError] = useState(false)

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3333/livro", book , { headers: headers }).then(
                (res) => toast(res.data.message)
            )
            navigate("/Books");
        } catch (error) {
            console.log(error)
            toast(error)
            setError(true)
        }
    }

    return (
        <div className="form">
            <h1 className="title"> Adicionar novo livro </h1>

            <input className="box_input" type="number" placeholder="ISBN" onChange={handleChange} name="isbn"/>
            <input className="box_input" type="text" placeholder="Titulo" onChange={handleChange} name="titulo"/>
            <input className="box_input" type="text" placeholder="Descrição" onChange={handleChange} name="descricao"/>
            <input className="box_input" type="date" placeholder="Data de Aquisição" onChange={handleChange} name="data_de_aquisicao"/>
            <input className="box_input" type="text" placeholder="Estado de Conservação" onChange={handleChange} name="estado_de_conservacao"/>
            <input className="box_input" type="text" placeholder="Localização Física" onChange={handleChange} name="localizacao_fisica"/>
            <input className="box_input" type="number" placeholder="URI da Capa" onChange={handleChange} name="uri_da_capa_do_livro"/>
            <button onClick={handleClick}> Adicionar </button>
            {error && "Algo deu errado!"}
            <Link className="hyperlink" to="/Books"> Voltar para a Página Inicial </Link>
        </div>
    )
}

export default AddBook