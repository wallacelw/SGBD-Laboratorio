import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
    const [user, setUser] = useState({
        id: null,
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
            await axios.put(`http://localhost:3333/usuario/${UserId}`, user);
            navigate("/Users");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    //dbg
    // console.log(user)

    return (
        <div className="form">
            <h1> Atualizar o usuario </h1>
            <input type="number" placeholder="ID" onChange={handleChange} name="id"/>

            <input type="text" placeholder="Nome" onChange={handleChange} name="nome"/>

            <input type="text" placeholder="Sobrenome" onChange={handleChange} name="sobrenome"/>

            <input type="radio" id="adm" name="funcao" onChange={handleChange} value="administrador"/>
            <label htmlFor="adm"> Administrador </label>
            <input type="radio" id="mem" name="funcao" onChange={handleChange} value="membro"/>
            <label htmlFor="mem"> Membro </label>

            <input type="text" placeholder="Login" onChange={handleChange} name="login"/>

            <input type="password" placeholder="Senha" onChange={handleChange} name="senha"/>

            <input type="number" placeholder="URI da Capa" onChange={handleChange} name="uri_da_foto_do_usuario"/>

            <button onClick={handleClick}> Atualizar </button>
            {error && "Algo deu errado!"}

            <Link to="/Users"> Voltar para a Página de Usuarios </Link>
        </div>
    )
}

export default EditUser