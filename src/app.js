import express from "express";
import booksRoutes from "./routes/books.routes.js";


const app = express();
app.use(express.json());
app.use('/api',booksRoutes);
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app;