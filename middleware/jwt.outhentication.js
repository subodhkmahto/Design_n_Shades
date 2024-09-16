import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Load secret key or private key from environment variables
const secretOrPrivateKey = process.env.SECRET_KEY_OR_PRIVATEKEY;

// Function to generate JWT token
export const generateToken = (userData, expiresIn = '1h') => {
  try {
    const token = jwt.sign(
      { userId: userData.id, email: userData.email }, 
      secretOrPrivateKey, 
      { expiresIn }  // Default expiration is 1 hour
    );
    return token;
  } catch (error) {
    console.error('Error generating JWT:', error);
    return null;
  }
};

// Function to verify JWT token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretOrPrivateKey);
    return decoded;
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return null;
  }
};

// Function to refresh token (if needed)
export const refreshToken = (token, newExpiresIn = '1h') => {
  try {
    const decoded = jwt.verify(token, secretOrPrivateKey, { ignoreExpiration: true });
    const newToken = generateToken({ id: decoded.userId, email: decoded.email }, newExpiresIn);
    return newToken;
  } catch (error) {
    console.error('Error refreshing JWT:', error);
    return null;
  }
};
