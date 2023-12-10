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
            await axios.delete("http://localhost:3333/material"+id)
            window.location.reload()
        } 
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1> Materiais </h1>
            <div className="materials">
                {materials.map(material => (
                    <div className="material" key={material.id}>
                        {material.uri_da_foto_do_material && <img src={material.uri_da_foto_do_material} alt="" />}
                        <h2>{material.numero_de_serie}</h2>
                        <p>{material.descricao}</p>
                        <button className="delete" onClick={() => handleDelete(material.id)}> Apagar </button>
                        <button className="edit"> <Link to={`/Material/Edit/${material.id}`}> Editar </Link> </button>
                    </div>
                ))}
            </div>
            <button><Link to="/Material/Add"> Adicionar novo material </Link></button>
        </div>
    )
}

export default Materials