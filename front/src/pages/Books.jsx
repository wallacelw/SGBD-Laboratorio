import React, { useEffect, useState } from "react"
import axios from "axios"

const Books = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http:localhost:3333/livros")
                console.log(res)
            } catch(error) {
                console.log(error)
            }
        }
        fetchAllBooks()
    }, [])

    return (
        <div>
            Hello
        </div>
    )
}

export default Books