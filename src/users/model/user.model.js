import { ObjectId } from "mongodb";
import { getDB } from "../../../public/config/db.js";

export default class UserModel {

    constructor(_id, name, email, password) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static async tableName() {
        const db = await getDB(); 
        return db.collection('adm_user'); 
    }

static async signIn(name, email, password, phoneNo, ip = 'unknown') {
    try {
        const table = await this.tableName();
        // Fetch the last inserted user to get the last _id (assuming numeric _id, not ObjectId)
        const lastUser = await table.find().sort({ _id: -1 }).limit(1).toArray();
        const newId = lastUser.length ? lastUser[0]._id + 1 : 1; // Increment _id or set to 1

        // Get current timestamp for creation and update
        const currentTimestamp = new Date().toISOString();

        // Create the new user object with additional fields
        const newUser = {
            _id: new ObjectId(), // Generate a new ObjectId for MongoDB
            name: name,
            email: email,
            phoneNo: phoneNo,
            password: password, // Ideally store hashed passwords, not plaintext
            created_at: currentTimestamp,
            updated_at: currentTimestamp,
            ip: ip, // Optionally pass in IP address
            status: 'active', // New users start as 'active'
            role: 'user', // Default role can be 'user', 'admin' can be assigned later
            last_login: null, // No login yet
        };

        // Insert the new user into the collection
        await table.insertOne(newUser);

        return newUser;
    } catch (err) {
        console.log('Error in signIn:', err);
    }
}


    static async signup(email, password) {
        try {
            const table = await this.tableName(); // Get the MongoDB collection
            
            console.log(email,password);
            // Use MongoDB's `findOne` method to query by email and password
            const user = await table.findOne({
                email: email,
                password: password,
            });

            console.log(user); // Log the found user (or null if not found)
            return user; // Return the user if found, otherwise return null
        } catch (err) {
            console.log('Error in signup:', err);
        }
    }
}
