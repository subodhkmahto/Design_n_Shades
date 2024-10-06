import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import layout from 'express-ejs-layouts';
import { mongoDB } from './public/config/db.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import userRouter    from './routes/user.router.js'; 
import productRouter from './routes/product.router.js';
import contactRouter from './routes/contact.router.js';

dotenv.config();

const server = express();

// Session configuration
server.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret', // Ensure this is stored securely in environment variables
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Use secure cookies in production
}));

server.use(flash()); // Enable flash messages
server.use(cookieParser()); // Parse cookies

// Middleware to handle form and JSON data
server.use(express.urlencoded({ extended: true })); // Handle form data
server.use(express.json()); // Handle JSON data

// Set up EJS layouts
server.use(layout);
server.set('view engine', 'ejs');
server.set('views', path.resolve('src/module/views')); // Simplified path resolution

// Static files
server.use(express.static(path.resolve('public'))); // Serve static files from the public folder

// Routes
server.use('/', userRouter); 
server.use('/', productRouter);
server.use('/', contactRouter);

// Start the server
const port = process.env.PORT || 8080;
server.listen(port, () => {
    mongoDB(); // Connect to MongoDB when server starts
    console.log(`Server is running at http://localhost:${port}`);
});


// import express from 'express';
// import path from 'path';
// import dotenv from 'dotenv';
// import layout from 'express-ejs-layouts';
// import { mongoDB } from './public/config/db.js';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import flash from 'connect-flash';
// import userRouter from './src/routes/user.router.js'; 
// import productRouter from './src/routes/product.router.js';
// import contactRouter from './src/routes/contact.router.js';

// dotenv.config();

// const server = express();
// server.use(session({
//     secret: 'your-secret', // Use a secure secret
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set true if using HTTPS
// }));

// server.use(flash());
// server.use(cookieParser());
// server.use(express.urlencoded({ extended: true })); // For form data
// server.use(express.json()); // For JSON data

// server.use(layout);

// server.set('view engine', 'ejs');
// server.set('views', path.join(path.resolve(), 'src', 'module', 'views'));
// server.use(express.static('public'));


// server.use('/user', userRouter); 
// server.use('/product',productRouter);
// server.use('/contact',contactRouter);



// server.use(express.static('src/view'));


// const port = process.env.PORT || 8080;

// server.listen(port, () => {
//     mongoDB(); // Call the function to connect to MongoDB
//     console.log(`Server is running at http://localhost:${port}`);
// });
