import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const saltRounds = Number.isInteger(parseInt(process.env.SALT_ROUNDS)) ? parseInt(process.env.SALT_ROUNDS) : 10;

const hashData = async (data) => {
    try {
        return await bcrypt.hash(data, saltRounds);
    } catch (error) {
        throw error;  // Corrected this line
    }
};

export default hashData;
