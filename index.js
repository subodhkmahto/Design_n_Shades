import express from 'express';
import path from 'path';
import ProductController from './src/products/product.controller.js';
import layout from'express-ejs-layouts';
import validateRequest from './middleware/validation.middleware.js';
import { mongoDB } from './public/config/db.js';
import UserController from './src/users/controller/user.controller.js';

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

server.get('/register', usercontroller.register);
server.post('/register', usercontroller.register); // Handle POST request


server.get('/login_you', usercontroller.login_you);
server.post('/login_you', usercontroller.login_you);


// Serve static files
// server.use(express.static(path.join(path.resolve(), 'public')));

// Define routes
server.get('/', productrout.getProducts);
server.get('/new',productrout.getAddForm);
// server.post('/', validateRequest ,productrout.getAddNewProduct);
server.post('/' ,productrout.getAddNewProduct);

server.get('/update-product/:id', productrout.getUpdateProduct);
server.post('/updated-product',productrout.postUpdateProduct);

server.get('/delete-product/:id', productrout.deleteProduct);


server.use(express.static('src/view'));

// import query  from 'express-validator';

// server.use(express.json());
// server.get('/hello', query('name').notEmpty(), (req, res) => {
//   res.send(`Hello, ${req.query.person}!`);
// });

// Starting the server and MongoDB connection
server.listen(8084, () => {
     mongoDB(); // Call the function to connect to MongoDB
    console.log(`Server is running at http://localhost:8084`);
});