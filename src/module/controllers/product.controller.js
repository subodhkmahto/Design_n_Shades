import { render } from 'ejs';
import ProductModel from '../models/product.model.js';
import { ObjectId } from 'mongodb';
import session from 'express-session';

export default class ProductController {

    async getProducts(req, res) {
        try {
            const products = await ProductModel.getAllProducts();
            return res.render('product/view', { products ,userEmail:req.session.userEmail });
        } catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).send('Internal Server Error');
        }

    }

    async getAddForm(req, res) {
        try {
            console.log('Request method:', req.method);
    
            if (req.method !== 'POST') {
                return res.render('product/create', { errorMessage: null,userEmail:req.session.userEmail });
            }
            const { name, desc, price } = req.body;

            console.log('Form data:', req.body);

            let imageUrl_ = '';
            if (req.file && req.file.filename) {
                imageUrl_ = "images/" + req.file.filename;
            }
    
            const productTable = await ProductModel.tableName();
    
            const productModel = {
                name: name || 'Untitled',
                desc: desc || 'No description',
                price: price || 0,
                imageUrl: imageUrl_
            };
    
            await productTable.insertOne(productModel);
    
            console.log('Product successfully added.');
    
            const products = await ProductModel.getAllProducts();
            return res.render('view', { products ,userEmail:req.session.userEmail});
    
        } catch (error) {
            console.error('Error while adding product:', error);
    
            return res.render('create', { errorMessage: 'Error adding product. Please try again.',userEmail:req.session.userEmail });
        }
    }
    

    // Method to handle the form submission for adding a new product
    async getAddNewProduct(req, res) {
        // console.log(req.body);
        const { name, desc, price, url } = req.body;
        // let errors = [];

        // if (!name || name.trim() === '') {
        //     errors.push('Name is required');
        // }
        // if (!desc || desc.trim() === '') {
        //     errors.push('Description cannot be empty');
        // }
        // if (!price || parseFloat(price) <= 0) {
        //     errors.push('Price should be a positive number');
        // }
        // try {
        //     new URL(url); // Validate URL
        // } catch (error) {
        //     errors.push('URL is invalid');
        // }

        // if (errors.length > 0) {
        //     return res.render('new-product', { errorMessage: errors.join(', ') });
        // }

        try {
            await ProductModel.addProduct({ name, desc, price, imageUrl });
            const products = await ProductModel.getAllProducts();
            return res.render('product', { products ,userEmail:req.session.userEmail});
        } catch (error) {
            console.error('Error adding product:', error);
            return res.status(500).send('Internal Server Error');
        }
    }


    async getUpdateProduct(req, res, next) {

        if (req.method !== 'POST') {
            try {
                let id = req.params.id;
                console.log( new ObjectId(id));
                // Parse the id to ensure it's an integer
                const product = await ProductModel.getProductById( new ObjectId(id));
                console.log('Product fetched:', product);

                if (product) {
                    return res.render('product/update', { product,userEmail:req.session.userEmail });
                } else {
                    return res.status(404).send('Product not found');
                }
            } catch (error) {
                console.error('Error fetching product by ID:', error);
                return res.status(500).send('Internal Server Error');
            }

        }
    }
    

    postUpdateProduct(req, res) {
        const productData = {
            id: parseInt(req.body.id, 10),
            name: req.body.name,
            desc: req.body.desc,
            price: parseFloat(req.body.price),
            imageUrl: req.body.imageUrl
        };

        const value = ProductModel.updateProduct(productData);
        if (value) {
            const allProducts = ProductModel.getAllProducts();
            return res.render('product', { products: allProducts,userEmail:req.session.userEmail });
        } else {
            return res.status(404).send('Product not found');
        }
    }

    deleteProduct(req, res) {
        let id = req.params.id;
        const value = ProductModel.deleteProduct(id);
        if (value) {
            return res.redirect('/',{userEmail:req.session.userEmail});
        } else {
            return res.status(404).send('Product not found');
        }
    }

}
