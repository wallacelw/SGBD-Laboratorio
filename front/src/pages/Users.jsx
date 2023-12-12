import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Users = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:3333/usuarios")
                setUsers(res.data)
                console.log(res)
            } catch(error) {
                console.log(error)
            }
        }
        fetchAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3333/usuario/${id}`)
            window.location.reload()
        } 
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1 className="title"> Usuários </h1>
            <div className="users">
                {users.map(user => (
                    <div className="user" key={user.id}>
                        {user.uri_da_foto_do_usuario && <img src={user.uri_da_foto_do_usuario} alt="" />}
                        <h2>{user.nome} {user.sobrenome}</h2>
                        <p>{user.funcao}</p>
                        <button className="delete" onClick={() => handleDelete(user.id)}> Apagar </button>
                        <button className="edit"> <Link to={`/User/Edit/${user.id}`}> Editar </Link> </button>
                    </div>
                ))}
            </div>

            <button className="button_redirect" ><Link to="/Register"> Cadastrar novo Usuario </Link></button>
            <button className="button_redirect" ><Link to="/"> Voltar para página inicial </Link></button>
        </div>
    )
}

export default Users