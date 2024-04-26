import { Router } from "express";

import { getProducts, createProduct, updateProduct, deleteProduct, getProductsbyPattern } from "../controllers/books.controller.js";

const router = Router();

router.get('/products', getProducts );
router.get('/products/:pattern', getProductsbyPattern );
router.post('/products', createProduct);
router.put('/products', updateProduct );
router.delete('/products', deleteProduct);


export default router;
