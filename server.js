import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import layout from 'express-ejs-layouts';
import { mongoDB } from './public/config/db.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import userRouter from './routes/user.router.js'; 
import productRouter from './routes/product.router.js';
import contactRouter from './routes/contact.router.js';

dotenv.config(); // Load environment variables from .env file

const server = express();

// Session configuration
server.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret-key', // Ensure a secure secret is used
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 1000 * 60 * 60 * 24 // Example: 1 day expiration for session cookies
    }
}));

// Flash messages and cookie parsing
server.use(flash()); // Enable flash messages for displaying temporary messages
server.use(cookieParser()); // Parse cookies

// Middleware to handle form and JSON data
server.use(express.urlencoded({ extended: true })); // To handle URL-encoded form data
server.use(express.json()); // To handle JSON data

// Set up EJS and layouts
// server.use(layout); // Use express-ejs-layouts
server.set('view engine', 'ejs'); // Set EJS as the view engine
server.set('views', path.resolve('src/module/views')); // Set views directory

// Serve static files from the public directory
server.use(express.static(path.resolve('public'))); // For serving static assets

// Routes
server.get('/', (req, res) => {
    res.render('index', { userEmail: req.session.userEmail || null }); // Render the homepage
});

// Include custom routers
server.use('/', userRouter); 
server.use('/', productRouter);
server.use('/', contactRouter);

// Start the server and connect to the database
const port = process.env.PORT || 8080;
server.listen(port, () => {
    mongoDB(); // Connect to MongoDB when server starts
    console.log(`Server is running at http://localhost:${port}`);
});

