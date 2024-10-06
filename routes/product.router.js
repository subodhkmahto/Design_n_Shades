import express from 'express';
import ProductController from '../src/module/controllers/product.controller.js';
import { sessionAuth } from '../middleware/session.auth.middleware.js';
import { verifyToken } from '../middleware/jwt_outhentication.js';
import uploadFile from '../middleware/file.upload.middleware.js';
import validateRequest from '../middleware/validation.middleware.js';

const router = express.Router();

const productController = new ProductController();


router.get('/product', productController.getProducts);

router.get('/product/new', productController.getAddForm);

// router.post('/product/new', sessionAuth, verifyToken, uploadFile.single('imageUrl'), productController.createProduct);

router.post('/', validateRequest, productController.getAddNewProduct);

router.post('/product', productController.getAddNewProduct);

router.get('/product/update-product/:id', productController.getUpdateProduct);

router.post('/product/updated-product', verifyToken, productController.postUpdateProduct);

router.get('/product/delete-product/:id', verifyToken, productController.deleteProduct);

export default router;
