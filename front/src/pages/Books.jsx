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

    return (
        <div>
            <h1> Livros </h1>
            <div className="books">
                {books.map(book => (
                    <div className="book" key={book.isbn}>
                        <h2>{book.titulo}</h2>
                        {book.uri_da_capa_do_livro && <img src={book.uri_da_capa_do_livro} alt="" />}
                        <p>{book.descricao}</p>
                    </div>
                ))}
            </div>
            <button><Link to="/Add"> Adicionar novo livro </Link></button>
        </div>
    )
}

export default Books