import express from "express"

const app = express()

app.get("/", (req, res) => {
    res.json("Hello World")
})

// Abre o servidor local na porta 3333
const port = 3333
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
