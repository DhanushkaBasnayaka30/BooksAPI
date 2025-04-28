const { validationResult } = require("express-validator");
const books = require("../models/book");

// get all books
exports.getAllBooks = (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	const pageinatedBooks = books.slice(startIndex, endIndex);
	res.json({
		page,
		limit,
		total: books.length,
		data: pageinatedBooks,
	});
};

// get book by id
exports.getBookById = (req, res) => {
	const book = books.find((book) => book.id == parseInt(req.params.id));

	if (!book) {
		return res.status(404).json({ error: "Book not Found" });
	}
	res.json(book);
};

// add new book
exports.addBook = (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { id, name, author, publishedYear } = req.body;
	const existingBook = books.find((book) => book.id === id);
	if (existingBook) {
		return res.status(400).json({ errors: "Book with this ID already exists" });
	}

	const newBook = { id, name, author, publishedYear };
	books.push(newBook);
	res.status(201).json(newBook);
};

//update book
exports.updateBook = (req, res) => {
	const book = books.find((book) => book.Id === parseInt(req.params.id));

	if (!book) {
		return res.status(404).json({ error: "Book not Found" });
	}

	const { name, author, publishedYear } = req.body;
	if (name) book.name = name;
	if (author) book.author = author;
	if (publishedYear) book.publishedYear = publishedYear;

	res.json({ message: "Book updated successfully" });
};

//Delete Book
exports.deleteBook = (req, res) => {
	const bookIndex = books.findIndex(
		(book) => book.Id === parseInt(req.params.id)
	);

	if (bookIndex === -1) {
		return res.json(404).json({ error: "Book Not Found" });
	}
	books.splice(bookIndex, 1);
	res.json({ message: "Book deleted successfully" });
};
