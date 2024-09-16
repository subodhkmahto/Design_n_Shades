import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

const  hashData = async (data) => {
    try {
        return await bcrypt.hash(data, saltRounds);
    } catch (err) {
        console.error('Error hashing data:', err);
        throw new Error('Hashing failed');
    }
};

export default hashData;