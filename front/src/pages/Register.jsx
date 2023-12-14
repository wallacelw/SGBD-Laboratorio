import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { headers } from "../utils/utils";
import { toast } from "react-toastify";

const Register = () => {
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

    const [error,setError] = useState(false)

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3333/register", user, {headers: headers}).then(
                (res) => toast(res.data.message)
            )
            navigate("/Users");
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    //dbg
    // console.log(user)

    return (
        <div className="form">
            <h1 className="title"> Adicionar novo usuario </h1>

            <div className= "container_radio">
                <input className="radio" type="radio" id="adm" name="funcao" onChange={handleChange} value="administrador"/>
                    <label className="radio_input" htmlFor="adm"> Administrador </label>
                <input className="radio" type="radio" id="mem" name="funcao" onChange={handleChange} value="membro"/>
                    <label className="radio_input" htmlFor="mem"> Membro </label>
            </div>
            
            <input className="box_input" type="number" placeholder="ID" onChange={handleChange} name="id"/>

            <input className="box_input" type="text" placeholder="Nome" onChange={handleChange} name="nome"/>

            <input className="box_input" type="text" placeholder="Sobrenome" onChange={handleChange} name="sobrenome"/>

            <input className="box_input" type="text" placeholder="Login" onChange={handleChange} name="login"/>

            <input className="box_input" type="password" placeholder="Senha" onChange={handleChange} name="senha"/>

            <input className="box_input" type="number" placeholder="URI da Capa" onChange={handleChange} name="uri_da_foto_do_usuario"/>

            <button onClick={handleClick}> Adicionar </button>
            {error && "Algo deu errado!"}

            <div className="hyperlink_container">
                <Link className="hyperlink" to="/"> Voltar para a Página Inicial </Link>
            </div>
        </div>
    )
}

export default Register