import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv';
import hashData from './hashing_data.js';
dotenv.config();

 const validationData = async (data, hashdata) => {    
    try {
        const isValid = await bcrypt.compare( data, hashdata);  // Compare plain data with the hash
        return isValid;
    } catch (err) {
        console.error('Error validating data:', err);
        throw new Error('Validation failed');
    }
}

export default validationData;