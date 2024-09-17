import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS) || 50;

const hashData = async (data) => {
    try {
        if (typeof data !== 'string' && !Buffer.isBuffer(data)) {
            throw new Error('Data must be a string or Buffer');
        }
        console.log('Salt Rounds:', saltRounds);
        return await bcrypt.hash(data, saltRounds);
    } catch (err) {
        console.error('Error hashing data:', err);
        throw new Error('Hashing failed');
    }
};

export default hashData;
