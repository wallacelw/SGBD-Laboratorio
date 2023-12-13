import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEmprestimo = () => {
    const location = useLocation();
    const Id = parseInt(location.pathname.split("/")[2]);
    const BookIsbn = parseInt(location.pathname.split("/")[3]);
    const materialId = parseInt(location.pathname.split("/")[4]);
    const userId = parseInt(location.pathname.split("/")[5]);

    const navigate = useNavigate();
    const [error,setError] = useState(false);

    const [loan, setLoan] = useState({
        id: Id,
        id_do_livro: BookIsbn,
        id_do_material: materialId,
        id_do_usuario: userId,
        data_do_emprestimo: null,
        data_de_devolucao_prevista: null,
        status_do_emprestimo: ""
    });

    const handleChange = (e) => {
        setLoan((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:3333/emprestimo', loan);
            navigate("/Emprestimo/Search");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    return (
        <div className="form">
            <h1 className="title"> Atualizar o Emprestimo </h1>
            <input className="box_input" type="date" placeholder="Data do Emprestimo" onChange={handleChange} name="data_do_emprestimo"/>
            <input className="box_input" type="date" placeholder="Data da Devolução Prevista" onChange={handleChange} name="data_de_devolucao_prevista"/>

            <input type="radio" id="solicitado" name="status_do_emprestimo" onChange={handleChange} value="solicitado"/>
            <label htmlFor="solicitado"> Solicitado </label>

            <input type="radio" id="emprestado" name="status_do_emprestimo" onChange={handleChange} value="emprestado"/>
            <label htmlFor="emprestado"> Emprestado </label>

            <button onClick={handleClick}> Editar </button>
            {error && "Algo deu errado!"}
            <Link className="hyperlink" to="/Emprestimo/Search"> Voltar para a Página de Emprestimos </Link>
        </div>
    )
}

export default EditEmprestimo