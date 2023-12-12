import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Materials = () => {

    const [materials, setMaterials] = useState([])

    useEffect(() => {
        const fetchAllMaterials = async () => {
            try {
                const res = await axios.get("http://localhost:3333/materiais")
                setMaterials(res.data)
                console.log(res)
            } catch(error) {
                console.log(error)
            }
        }
        fetchAllMaterials()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3333/material/${id}`)
            window.location.reload()
        } 
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1 className="title"> Materiais </h1>
            <div className="books">
                {materials.map(material => (
                    <div className="book" key={material.id}>
                        <h2 className="title_q">{material.numero_de_serie}</h2>
                        <p>{material.descricao}</p>
                        <button className="delete" onClick={() => handleDelete(material.id)}> Apagar </button>
                        <button className="edit"> <Link to={`/Material/Edit/${material.id}`}> Editar </Link> </button>
                    </div>
                ))}
            </div>
            <button className="button_redirect"><Link  to="/Material/Add"> Adicionar novo material </Link></button>
            <button className="button_redirect" ><Link to="/"> Voltar para página inicial </Link></button>
        </div>
    )
}

export default Materials