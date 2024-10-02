import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import ProductController from './src/products/product.controller.js';
import layout from'express-ejs-layouts';
import validateRequest from './middleware/validation.middleware.js';
import { mongoDB } from './public/config/db.js';
import UserController from './src/users/controller/user.controller.js';
import { verifyToken } from './middleware/jwt_outhentication.js'; 
import cookieParser from 'cookie-parser';

import session from 'express-session';
import flash from 'connect-flash';
import uploadFile from './middleware/file.upload.middleware.js';
import { sessionAuth } from './middleware/session.auth.middleware.js';
import { setLastVisit } from './middleware/cookies.last.visit.js';
import ContactController from './src/cotact/contact.controller.js';



dotenv.config();

const usercontroller = new UserController();
const server = express();
server.use(session({
    secret: 'your-secret', // Use a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set true if using HTTPS
}));

server.use(flash());

server.use(cookieParser());

//pars from data

server.use(express.urlencoded({ extended: true })); // For form data (application/x-www-form-urlencoded)
server.use(express.json()); // For JSON data

server.use(layout);
// Set EJS as the template engine
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src', 'views'));
server.use(express.static('public'));

const productrout = new ProductController();

server.get('/user/register', usercontroller.register);
server.post('/user/register', usercontroller.register); // Handle POST request


// Example usage
server.get('/user/logout', setLastVisit, usercontroller.logout);

server.post('/user/login_you', usercontroller.login_you);
server.get('/user/login_you', usercontroller.login_you);

server.post('/user/password-reset', usercontroller.forgot_password);
server.get('/user/forgot_password', usercontroller.forgot_password);

// Serve static files
// server.use(express.static(path.join(path.resolve(), 'public')));

// Define routes
server.get('/product',  productrout.getProducts);
server.get('/product/new',productrout.getAddForm);
server.post('/product/new',sessionAuth, verifyToken,uploadFile.single('imageUrl'), productrout.getAddForm);

const contacts=new ContactController();
server.get('/contact',contacts.contactUser);
server.post('/contact',contacts.contactUser);

server.post('/', validateRequest ,productrout.getAddNewProduct);
server.post('/product' ,productrout.getAddNewProduct);

server.get('/product/update-product/:id', productrout.getUpdateProduct);
server.post('/product/updated-product',verifyToken,productrout.postUpdateProduct);

server.get('/product/delete-product/:id',verifyToken, productrout.deleteProduct);



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