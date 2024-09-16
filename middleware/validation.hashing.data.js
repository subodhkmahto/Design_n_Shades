import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

 const validationData = async (data, hashData) => {    
    try {
        const isValid = await bcrypt.compare(data, hashData);  // Compare plain data with the hash
        return isValid;
    } catch (err) {
        console.error('Error validating data:', err);
        throw new Error('Validation failed');
    }
}

export default validationData;