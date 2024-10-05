import hashData from "../../middleware/hashing_data.js";
import validationData from "../../middleware/validation_hashing_data.js";
import UserModel from "../models/user.model.js";
import validationHashing from "../../middleware/validation_hashing_data.js"
import { generateToken } from "../../middleware/jwt_outhentication.js";
import sendMail from "../../middleware/mailer.js";
import flash from 'connect-flash';
import { compare } from "bcrypt";
import ProductModel from "../models/product.model.js";


export default class UserController {


    async login_you(req, res) {
        const { email, password } = req.body;
    
        if (req.method !== 'POST') {
            return res.render('user/login_you');
        }
    
        try {
            const user = await UserModel.findByEmail(email);
            if (!user) {
                req.flash('warning', 'User not found.');
                return res.render('user/login_you');
            }
    
            const isPasswordValid = await validationData(password, user.password);
    
            if (!isPasswordValid) {
                req.flash('warning', 'Incorrect credentials, please try again.');
                return res.render('user/login_you');
            }
    
            // Successful login
            const accessToken = await generateToken(user);
            // console.log(accessToken);

            req.session.userEmail=email;

            res.cookie('token', accessToken, { httpOnly: true });
    
            // Fetch products here
            const productTable=ProductModel.tableName();
            
            const products = await ProductModel.getAllProducts(); // Adjust according to your data fetching method
            return res.render('product/view', { products });  // Pass products to the EJS template
        } catch (err) {
            console.error('Error during login:', err);
            return res.status(500).send('Internal server error');
        }
    }
    
   
        async register(req, res) {
            try {
                if (req.method === 'POST') {
                    const { name, email, password, mobile } = req.body;
                    const userIP = req.ip || req.connection.remoteAddress;
                    const result = await UserModel.signUp(name, email, password, mobile, userIP);
                    
                    if (result) {
                        return res.render('user/login_you');
                    } else {
                        return res.render('user/register');
                    }
                } else {
                    return res.render('user/register');
                }
            } catch (err) {
                console.error('Error during registration:', err);
                return res.render('user/register', { error: 'Registration failed. Please try again.' });
            }
        }
        

    async forgot_password(req, res) {  

            if (req.method !== 'POST') {
                return res.render('user/forgot_password'); // Correct spelling
            }
        
            const { email, password } = req.body;
        
            try {
                const user = await UserModel.findByEmail(email);
                // console.log('1');
                if (!user) {
                    req.flash('warning', 'User not found.');
                    return res.render('user/register');
                }

                const mailer=sendMail(email);

                const hashedPassword = await hashData(password);
                // console.log('3');

                // Update the user’s password directly in the database
                const userTable = await UserModel.tableName();
                await userTable.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
                // console.log('4');

                return res.render('user/login_you');
            } catch (error) {
                console.error('Error during password reset:', error);
                req.flash('error', 'An error occurred. Please try again.');
                return res.render('user/register');
            }
        }

        async logout(req, res, next) {
            try {
                req.session.destroy(err => {
                    if (err) {
                        console.error('Error destroying session:', err);
                        return next(err);  // Pass the error to the error-handling middleware
                    }

                    res.clearCookie('connect.sid');  // Clear the session cookie if needed
                    res.clearCookie('lastVisit');  // Optionally clear the last visit cookie as well
                    return res.redirect('user/login_you');  // Redirect to login after successful logout
                });
            } catch (error) {
                console.error('Error in logout process:', error);
                return next(error);  // Handle any unexpected errors
            }
           }

        
        
}
