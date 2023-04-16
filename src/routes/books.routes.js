import { Router } from "express";

import { getBooks, createBook, updateBook, deleteBook, getBooksbyPattern } from "../controllers/books.controller.js";

const router = Router();

router.get('/books', getBooks );
router.get('/books/:pattern', getBooksbyPattern );

router.post('/books', createBook);

router.put('/books', updateBook );

router.delete('/books', deleteBook);


export default router;
