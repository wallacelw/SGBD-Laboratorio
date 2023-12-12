import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Books = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:3333/livros")
                setBooks(res.data)
                console.log(res)
            } catch(error) {
                console.log(error)
            }
        }
        fetchAllBooks()
    }, [])

    const handleDelete = async (isbn) => {
        try {
            await axios.delete(`http://localhost:3333/livro/${isbn}`);
            window.location.reload()
        } 
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1 className="title"> Livros </h1>
            <div className="books">
                {books.map(book => (
                    <div className="book" key={book.isbn}>
                        <h2 className="title_q">{book.titulo}</h2>
                        <p>{book.descricao}</p>
                        <button className="delete" onClick={() => handleDelete(book.isbn)}> Apagar </button>
                        <button className="edit"> <Link to={`/Book/Edit/${book.isbn}`}> Editar </Link> </button>
                    </div>
                ))}
            </div>
            <button className="button_redirect" ><Link to="/Book/Add"> Adicionar novo livro </Link></button>
        </div>
    )
}

export default Books