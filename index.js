import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import ProductController from './src/products/product.controller.js';
import layout from'express-ejs-layouts';
import validateRequest from './middleware/validation.middleware.js';
import { mongoDB } from './public/config/db.js';
import UserController from './src/users/controller/user.controller.js';

dotenv.config();

const usercontroller = new UserController();


const server = express();

//pars from data

server.use(express.urlencoded({ extended: true })); // For parsing form data (x-www-form-urlencoded)
server.use(express.json()); // For parsing JSON data
server.use(layout);
// Set EJS as the template engine
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src', 'views'));
server.use(express.static('public'));

const productrout = new ProductController();

server.get('/user/register', usercontroller.register);
server.post('/user/register', usercontroller.register); // Handle POST request

server.post('/user/login_you', usercontroller.login_you);
server.get('/user/login_you', usercontroller.login_you);


// Serve static files
// server.use(express.static(path.join(path.resolve(), 'public')));

// Define routes
server.get('/product', productrout.getProducts);
server.get('/product/new',productrout.getAddForm);

server.post('/', validateRequest ,productrout.getAddNewProduct);
server.post('/product' ,productrout.getAddNewProduct);

server.get('/product/update-product/:id', productrout.getUpdateProduct);
server.post('/product/updated-product',productrout.postUpdateProduct);

server.get('/product/delete-product/:id', productrout.deleteProduct);


server.use(express.static('src/view'));

// import query  from 'express-validator';

// server.use(express.json());
// server.get('/hello', query('name').notEmpty(), (req, res) => {
//   res.send(`Hello, ${req.query.person}!`);
// });

// Starting the server and MongoDB connection
const port=process.env.PORT ||8080;

server.listen(port, () => {
     mongoDB(); // Call the function to connect to MongoDB
    console.log(`Server is running at http://localhost:${port}/product`);
});