import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { headers } from "../utils/utils";
import { toast } from "react-toastify";

const EditUser = () => {
    const [user, setUser] = useState({
        nome: "",
        sobrenome: "",
        funcao: "",
        login: "",
        senha: "",
        uri_da_foto_do_usuario: null,
    });

    const navigate = useNavigate();
    const location = useLocation();
    const UserId = location.pathname.split("/")[3];
    const [error,setError] = useState(false)

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3333/usuario/${UserId}`, user, {headers: headers}).then(
                (res) => toast(res.data.message)
            );
            navigate("/Users");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    return (
        <div className="form">
            <h1 className="title"> Atualizar o usuario </h1>

            <div className="container_radio">
                <input className="radio" type="radio" id="adm" name="funcao" onChange={handleChange} value="administrador"/>
                    <label className="radio_input" htmlFor="adm"> Administrador </label>
                <input className="radio" type="radio" id="mem" name="funcao" onChange={handleChange} value="membro"/>
                    <label className="radio_input" htmlFor="mem"> Membro </label>
            </div>

            <input className="box_input" type="text" placeholder="Nome" onChange={handleChange} name="nome"/>

            <input className="box_input" type="text" placeholder="Sobrenome" onChange={handleChange} name="sobrenome"/>

            <input className="box_input" type="text" placeholder="Login" onChange={handleChange} name="login"/>

            <input className="box_input" type="password" placeholder="Senha" onChange={handleChange} name="senha"/>

            <input className="box_input" type="text" placeholder="URI da Foto" onChange={handleChange} name="uri_da_foto_do_usuario"/>

            <button onClick={handleClick}> Atualizar </button>
            {error && "Algo deu errado!"}

            <Link className="hyperlink" to="/Users"> Voltar para a Página de Usuarios </Link>
        </div>
    )
}

export default EditUser