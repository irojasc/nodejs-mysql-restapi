import { Router } from "express";

import { createProduct, updateProduct, deleteProduct, getProductsbyPattern, getLastProductsByCtgy } from "../controllers/books.controller.js";

const router = Router();

// router.get('/products', getProducts );
router.get('/products/:pattern', getProductsbyPattern );
router.get('/products', getLastProductsByCtgy );
router.post('/products', createProduct);
router.put('/products', updateProduct );
router.delete('/products', deleteProduct);


export default router;
