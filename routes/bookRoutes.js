const express = require("express");

const bookController = require("../controllers/bookContoller");
const {
	bookValidationRules,
	validate,
} = require("../middlewares/validateBook");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */

router.get("/", bookController.getAllBooks);

/**
 * @swagger
 * /api/books/getbook/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 */


router.get("/getbook/:id", bookController.getBookById);

/**
 * @swagger
 * /api/books/addbook:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - author
 *               - publishedYear
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book created
 *       400:
 *         description: Bad request
 */
router.post("/addbook", bookValidationRules, validate, bookController.addBook);

/**
 * @swagger
 * /api/books/updatebook/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - author
 *               - publishedYear
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Book not found
 */

router.put(
	"/updatebook/:id",
	bookValidationRules,
	validate,
	bookController.updateBook
);

/**
 * @swagger
 * /api/books/deletebook/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 */
router.delete("/deletebook/:id", bookController.deleteBook);

module.exports = router;
