import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [user, setUser] = useState({
        login: "",
        senha: "",
    });

    const navigate = useNavigate();

    const [error,setError] = useState(false)

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClickLogin = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3333/login", user)
            navigate("/Books");
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    const handleClickLogout = async (e) => {
        e.preventDefault()
        try {
            await axios.get("http://localhost:3333/logout")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="form">
            <h1> Faça o Login com a sua Conta! </h1>
            <input type="text" placeholder="Login" onChange={handleChange} name="login"/>
            <input type="password" placeholder="Senha" onChange={handleChange} name="senha"/>
            <button onClick={handleClickLogin}> Entrar </button>
            {error && "Algo deu errado no Login!"}

            <button onClick={handleClickLogout}> Sair </button>

            <Link to="/Register"> Ir para a tela de Cadastros </Link>
            <Link to="/Users"> Ir para a tela de Usuarios </Link>
            <Link to="/Books"> Ir para a tela de Livros </Link>
            <Link to="/Materials"> Ir para a tela de Materiais </Link>
        </div>
    )
}

export default Login