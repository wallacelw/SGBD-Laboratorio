import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Emprestimos = () => {

    const [emprestimos, setEmprestimos] = useState([])

    useEffect(() => {
        const fetchAllEmprestimos = async () => {
            try {
                const res = await axios.get("http://localhost:3333/emprestimos")
                setEmprestimos(res.data)
                console.log(res)
            } catch(error) {
                console.log(error)
            }
        }
        fetchAllEmprestimos()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3333/emprestimo"+id)
            window.location.reload()
        } 
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1 className="title"> Emprestimos </h1>
            <div className="emprestimos">
                {emprestimos.map(emprestimo => (
                    <div className="emprestimo" key={emprestimo.id}>
                        <h2>{emprestimo.id_do_livro}</h2>
                        <h2>{emprestimo.id_do_material}</h2>
                        <button className="delete" onClick={() => handleDelete(emprestimo.id)}> Apagar </button>
                        <button className="edit"> <Link to={`/Emprestimo/Edit/${emprestimo.id}`}> Editar </Link> </button>
                    </div>
                ))}
            </div>
            <button><Link className="button_redirect" to="/Emprestimo/Add"> Adicionar novo emprestimo </Link></button>
            <button><Link className="button_redirect" to="/Emprestimo/Search"> Adicionar novo emprestimo </Link></button>
        </div>
    )
}

export default Emprestimos