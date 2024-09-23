// src/controller/product.controller.js
import { render } from 'ejs';
import ProductModel from './product.model.js';
import { ObjectId } from 'mongodb';
import session from 'express-session';

export default class ProductController {

    // Method to get all products and render the product list view
    async getProducts(req, res) {
        try {
            const products = await ProductModel.getAllProducts();
            // console.log(products);
            return res.render('product', { products ,userEmail:req.session.userEmail });
        } catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).send('Internal Server Error');
        }

    }

    async getAddForm(req, res) {
        try {
            console.log('Request method:', req.method);
    
            if (req.method !== 'POST') {
                return res.render('new-product', { errorMessage: null,userEmail:req.session.userEmail });
            }
            const { name, desc, price } = req.body;

            console.log('Form data:', req.body);

            let imageUrl_ = '';
            if (req.file && req.file.filename) {
                imageUrl_ = "images/" + req.file.filename;
            }
    
            // Ensure that the tableName function returns a valid collection reference
            const productTable = await ProductModel.tableName();
    
            // Create a new product object with form data and default values
            const productModel = {
                name: name || 'Untitled',
                desc: desc || 'No description',
                price: price || 0,
                imageUrl: imageUrl_
            };
    
            // Insert the product into the collection
            await productTable.insertOne(productModel);
    
            console.log('Product successfully added.');
    
            // Fetch all products and render the 'product' view
            const products = await ProductModel.getAllProducts();
            return res.render('product', { products ,userEmail:req.session.userEmail});
    
        } catch (error) {
            // Log the error message for debugging
            console.error('Error while adding product:', error);
    
            // In case of an error, return the 'new-product' form with an error message
            return res.render('new-product', { errorMessage: 'Error adding product. Please try again.',userEmail:req.session.userEmail });
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
                    return res.render('update-product', { product,userEmail:req.session.userEmail });
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
