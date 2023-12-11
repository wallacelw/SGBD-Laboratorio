import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmprestimo = () => {
    const [emprestimo, setEmprestimo] = useState({
        id_do_livro: null,
        id_do_material: null,
        id_do_usuario: null,
        tipo_do_item: "",
        data_do_emprestimo: null,
        data_de_devolucao_prevista: null,
        status_do_emprestimo: ""
    });

    const navigate = useNavigate();

    const [error,setError] = useState(false)

    const handleChange = (e) => {
        setEmprestimo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3333/emprestimo", emprestimo)
            navigate("/Emprestimos");
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    const [selectedOption, setSelectedOption] = useState('livro');
 
    const handleRadio = (event) => {
        setSelectedOption(event.target.value);
      };

    return (
        <div className="form">
            
            <h1 className="title"> Adicionar novo emprestimo </h1>
            <label className= "container_radio">
                    <input className="radio" type="radio" id="livro" checked={selectedOption === 'livro'} onChange={handleRadio} value="livro"/>
                <label className="radio_input" htmlFor="livro"> Livro </label>

                    <input  className="radio" type="radio" id="material"checked={selectedOption === 'material'} onChange={handleRadio} value="material"/>
                <label className="radio_input" htmlFor="material"> Material </label>
            </label>

            {selectedOption === 'livro' && (
                <div>
                    <div>
                        <input className="box_input" type="number" placeholder="ID do Livro" onChange={handleChange} name="id_do_livro"/>
                    </div>
                    <div>
                        <input className="box_input" type="number" onChange={handleChange} name="id_do_material" value={null} hidden/>
                    </div>
                    <div>
                        <input className="box_input" type="number" placeholder="ID do Usuário" onChange={handleChange} name="id_do_usuario"/>
                    </div>
                    <div>
                        <inpu className="box_input"t type="text" onChange={handleChange} name="tipo_do_item" value={"livro"} hidden/>
                    </div>
                    <div>
                        <input className="box_input" type="date" placeholder="Data de Emprestimo" onChange={handleChange} name="data_do_emprestimo"/>
                    </div>
                    <div>
                        <input className="box_input" type="date" placeholder="Data de Devolução" onChange={handleChange} name="data_de_devolucao_prevista"/>
                    </div>
                    <div>
                        <input className="box_input" type="text" placeholder="Status" onChange={handleChange} name="status_do_emprestimo"/>
                    </div>
                    <div>
                        <button onClick={handleClick}> Adicionar </button>
                    </div>
                    {error && "Algo deu errado!"}
                </div>
                   )} 

        {selectedOption === 'material' && (
                <div>
                    <div>
                        <input type="number" placeholder="ID do Livro" onChange={handleChange} name="id_do_livro" value={null} hidden/>
                    </div>
                    <div>
                        <input type="number" placeholder="ID do Material" onChange={handleChange} name="id_do_material"/>
                    </div>
                    <div>
                        <input type="number" placeholder="ID do Usuário" onChange={handleChange} name="id_do_usuario"/>
                    </div>
                    <div>
                        <input type="text" onChange={handleChange} name="tipo_do_item" value={"material"} hidden/>
                    </div>
                    <div>
                        <input type="date" placeholder="Data de Emprestimo" onChange={handleChange} name="data_do_emprestimo"/>
                    </div>
                    <div>
                        <input type="date" placeholder="Data de Devolução" onChange={handleChange} name="data_de_devolucao_prevista"/>
                    </div>
                    <div>
                        <input type="text" placeholder="Status" onChange={handleChange} name="status_do_emprestimo"/>
                    </div>
                    <div>
                        <button onClick={handleClick}> Adicionar </button>
                    </div>
                    {error && "Algo deu errado!"}
                </div>
                   )} 
            <Link className="hyperlink" to="/Emprestimos"> Voltar para a Página Inicial </Link>
        </div>
    )
}

export default AddEmprestimo