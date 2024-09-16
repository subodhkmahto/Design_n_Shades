import { ObjectId } from "mongodb";
import { getDB } from "../../../public/config/db.js";
import hashData from "../../../middleware/hashing.data.js";
import validationData from "../../../middleware/validation.hashing.data.js";

export default class UserModel {

    constructor(_id, name, email, password,mobile) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
    }

    static async tableName() {
        const db = await getDB(); 
        return db.collection('adm_user'); 
    }

    static async signIn(name, email, password, phoneNo, ip = 'unknown') {
        try {
            const table = await this.tableName();
            const lastUser = await table.find().sort({ _id: -1 }).limit(1).toArray();
            const newId = lastUser.length ? lastUser[0]._id + 1 : 1;
    
            const hashPassword = await hashData(password);
    
            const currentTimestamp = new Date().toISOString();
    
            const newUser = {
                _id: new ObjectId(),
                name: name,
                email: email,
                phoneNo: phoneNo,
                password: hashPassword,
                created_at: currentTimestamp,
                updated_at: currentTimestamp,
                ip: ip,
                status: 'active',
                role: 'user',
                last_login: null,
            };
    
            console.log(newUser);
    
            await table.insertOne(newUser);
    
            return newUser;
        } catch (err) {
            console.log('Error in signIn:', err);
        }
    }
    

    static async signup(email, password) {
        try {
            // Get the MongoDB collection (assuming `this.tableName` returns the collection)
            const table = await this.tableName();

            console.log(email, password);

            // Query MongoDB to find the user by email
            const user = await table.findOne({ email: email });

            // Check if user exists and validate password
            if (user && user.password) {
                const isPasswordValid = await validationData(password, user.password);
                
                if (!isPasswordValid) {
                    console.log('Invalid credentials, please try again.');
                    return null; // Optionally, return null if validation fails
                } else {
                    return user; // Return the user if the credentials are valid
                }
            } else {
                console.log('User not found or invalid password.');
                return null; // Optionally, return null if user is not found
            }

        } catch (err) {
            console.log('Error in signup:', err);
        }
    }

}
