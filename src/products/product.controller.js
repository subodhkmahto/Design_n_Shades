// src/controller/product.controller.js
import { render } from 'ejs';
import ProductModel from './product.model.js';

export default class ProductController {

    // Method to get all products and render the product list view
    async getProducts(req, res) {
        try {
            const products = await ProductModel.getAllProducts();
            // console.log(products);
            return res.render('product', { products });
        } catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).send('Internal Server Error');
        }

    }

    // Method to render the form for adding a new product
   // In product.controller.js
  getAddForm(req, res){
    return res.render('new-product', { errorMessage: null });
};

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
            await ProductModel.addProduct({ name, desc, price, url });
            const products = await ProductModel.getAllProducts();
            return res.render('product', { products });
        } catch (error) {
            console.error('Error adding product:', error);
            return res.status(500).send('Internal Server Error');
        }
    }


    getUpdateProduct(req,res,next){
        let id = req.params.id;
    
        const product = ProductModel.getProductById(id);
        console.log(product);

        if (product) {
            return res.render('update-product', { product });
        } else {
            return  res.status(404).send('Product not found');
        }
    
    }

    postUpdateProduct(req, res) {
        const productData = {
            id: parseInt(req.body.id, 10),
            name: req.body.name,
            desc: req.body.desc,
            price: parseFloat(req.body.price),
            url: req.body.url
        };

        const value = ProductModel.updateProduct(productData);
        if (value) {
            const allProducts = ProductModel.getAllProducts();
            return res.render('product', { products: allProducts });
        } else {
            return res.status(404).send('Product not found');
        }
    }

    deleteProduct(req, res) {
        let id = req.params.id;
        const value = ProductModel.deleteProduct(id);
        if (value) {
            return res.redirect('/');
        } else {
            return res.status(404).send('Product not found');
        }
    }

}
