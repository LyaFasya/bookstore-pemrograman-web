import express from 'express'
import mysql from 'mysql2'

const app = express()
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bookstore'
})

app.get('/books', (req, res) => {
    const sql = "SELECT * FROM books"
    db.query(sql, (error, result) => {
        if (error) {
            return res.status(500).json({message: error})
        }
        res.json({
            success: true,
            message: "Data buku berhasil diambil",
            data: result
        })
    })
})

app.post('/books', (req, res) => {
    const {title, author, price, stock } = req.body
    if (!title || !author || !price || !stock) {
        return res.status(400).json({
            success: false,
            message: "Semua field wajib diisi"
        })
    }
    const sql = "INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)"
    db.query(sql, [title, author, price, stock], (error, result) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
        res.status(201).json({
            success: true,
            message: "Buku berhasil ditambahkan",
            data: {
                id: result.insertId,
                title,
                author,
                price,
                stock
            }
        })
    })
})

app.listen(8000, () => {
    console.log("Server running on 8000")
})