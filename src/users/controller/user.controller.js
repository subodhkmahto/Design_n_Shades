import UserModel from "../model/user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  
        // Signup method
        async login_you(req, res) {
            // Check the request method
            console.log(req.method);
            if (req.method !== 'POST') {
                return res.render('login_you');  // Render login page on GET request
            }
        
            const { email, password } = req.body;
        
            try {
                const user = await UserModel.signup(email, password);
        
                if (user !== null) {
                    return res.render('product');  // Render product page on successful signup
                } else {
                    req.flash('warning', 'Incorrect credentials, please try again.');
                    return res.render('login_you');  // Render login again if signup fails
                }
            } catch (err) {
                console.error('Error during signup:', err);
                return res.status(500).send('Internal server error');
            }
        }
        
    // SignIn method
    async register(req, res) {
        if (req.method === 'POST') {

            const { name, email, password, phoneNo } = req.body;
            const userIP = req.ip || req.connection.remoteAddress;
            try {
                const result = await UserModel.signIn(name, email, password, phoneNo, userIP);
    
                if (!result) {
                    return res.status(400).send('Incorrect Credentials');
                } else {
                    // Create token
                    const token = jwt.sign(
                        {
                            userID: result.id,
                            email: result.email,
                        },
                        'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
                        {
                            expiresIn: '1h',
                        }
                    );
                    // Send token and render view
                    return res.render('view', { token,result });
                }
            } catch (err) {
                console.error('Error during login:', err);
                return res.status(500).send('Internal server error');
            }
        } else {
            return res.render('register');
        }
    }
    
}
