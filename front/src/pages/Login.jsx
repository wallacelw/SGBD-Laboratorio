import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { headers } from "../utils/utils";
import { toast } from "react-toastify";
const Login = () => {
  const [user, setUser] = useState({
    login: "",
    senha: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3333/login", user, {withCredentials: true,}).then((res) => {
        localStorage.setItem("authLevel", res.data.authLevel);
        localStorage.setItem("authToken", res.data.token);
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("authToken");
        toast(res.data.message);
      })
      navigate("/Books");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleClickLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:3333/logout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h1 className="title"> Faça o Login com a sua Conta! </h1>
      <input
        className="box_input"
        type="text"
        placeholder="Login"
        onChange={handleChange}
        name="login"
      />
      <input
        className="box_input"
        type="password"
        placeholder="Senha"
        onChange={handleChange}
        name="senha"
      />

      <div className="login_button_container">
        <button className="login_button" onClick={handleClickLogin}>
          {" "}
          Entrar{" "}
        </button>
        {error && "Algo deu errado no Login!"}

        <button className="login_button" onClick={handleClickLogout}>
          {" "}
          Sair{" "}
        </button>
      </div>

      <div className="hyperlink_container">
        <div>
          <Link className="hyperlink" to="/Register">
            {" "}
            Ir para a tela de Cadastros{" "}
          </Link>
        </div>
        <div>
          <Link className="hyperlink" to="/Users">
            {" "}
            Ir para a tela de Usuarios{" "}
          </Link>
        </div>
        <div>
          <Link className="hyperlink" to="/Books">
            {" "}
            Ir para a tela de Livros{" "}
          </Link>
        </div>
        <div>
          <Link className="hyperlink" to="/Materials">
            {" "}
            Ir para a tela de Materiais{" "}
          </Link>
        </div>
        <div>
          <Link className="hyperlink" to="/Emprestimo/Search">
            {" "}
            Ir para a tela de Emprestimos{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
