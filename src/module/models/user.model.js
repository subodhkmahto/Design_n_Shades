import { ObjectId } from "mongodb";
import { getDB } from "../../../public/config/db.js";
import hashData from "../../../middleware/hashing_data.js";
import validationData from "../../../middleware/validation_hashing_data.js";

export default class UserModel {

    constructor(_id, name, email, password, mobile) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
    }

    // Helper function to get the collection
     async tableName() {
        const db = await getDB();
        return db.collection('adm_user');
    }

     async signUp(name, email, password, mobile, ip = 'unknown') {
        try {
            const user = await this.tableName();
            console.log(name, email, password, mobile, ip = 'unknown')
            const existingUser = await user.findOne({ email });
            console.log(existingUser);
            if (existingUser!=null) {
                console.log('User already exists with this email.');
                return null; 
            }
            const hashedPassword = await hashData(password);
            // console.log(hashedPassword);
            const newUser = {
                _id: new ObjectId(), 
                name:name,
                email:email,
                mobile:mobile, 
                password: hashedPassword,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                ip:ip,
                status: 'active',
                role: 'user',
                last_login: new Date().toISOString(),
            };
            await user.insertOne(newUser);
            return newUser; 
        } catch (err) {
            console.error('Error during signUp:', err);
            throw new Error('Failed to sign up user.');
        }
    }

    // Login method to authenticate a user
     async login(email, password) {
        try {
            const table = await this.tableName();

            // Find the user by email
            const user = await table.findOne({ email });

            if (!user) {
                console.log('User not found.');
                return null;
            }

            // Validate the password
            const isPasswordValid = await validationData(password, user.password);
            if (!isPasswordValid) {
                console.log('Invalid credentials.');
                return null;
            }

            // Update last login time
            await table.updateOne({ _id: user._id }, { $set: { last_login: new Date().toISOString() } });

            return user; // Return user details on successful login
        } catch (err) {
            console.error('Error during login:', err);
            throw new Error('Failed to login user.');
        }
    }
    // Method to find user by email
     async findByEmail(email) {
            try {
                const userTable = await this.tableName();
                const user = await userTable.findOne({ email });
                return user;  // Return user if found
            } catch (err) {
                console.error('Error finding user by email:', err);
                throw new Error('Failed to find user by email.');
            }
     }

}
