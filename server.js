const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Inisialisasi aplikasi Express
const app = express();
app.use(bodyParser.json());

// Array untuk menyimpan buku
const books = [];

// Endpoint untuk menambahkan buku baru
app.post('/books', (req, res) => {
    const { title, author, genre, publishedDate } = req.body;

    if (!title || !author || !genre || !publishedDate) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newBook = {
        id: uuidv4(),
        title,
        author,
        genre,
        publishedDate
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// Endpoint untuk mendapatkan daftar semua buku
app.get('/books', (req, res) => {
    res.json(books);
});

// Endpoint untuk mendapatkan detail buku berdasarkan ID
app.get('/books/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find(b => b.id === id);

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Endpoint untuk memperbarui buku berdasarkan ID
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, genre, publishedDate } = req.body;

    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex !== -1) {
        books[bookIndex] = { id, title, author, genre, publishedDate };
        res.json(books[bookIndex]);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Endpoint untuk menghapus buku berdasarkan ID
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Menjalankan server pada port 9000
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
