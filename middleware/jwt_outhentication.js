import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Load secret key or private key from environment variables
const SECRET_OR_PRIVATE_KEY = process.env.SECRET_KEY_OR_PRIVATEKEY;

// Function to generate JWT token
export const generateToken = (userData, expiresIn = '1h') => {
  try {
    const token = jwt.sign(
      { userId: userData.id, email: userData.email },
      SECRET_OR_PRIVATE_KEY,
      { expiresIn }  // Default expiration is 1 hour
    );
    return token;
  } catch (error) {
    console.error('Error generating JWT:', error);
    return null;
  }
};

// Function to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;  // The cookie is automatically parsed by cookie-parser

  try {

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, SECRET_OR_PRIVATE_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token.' });
      }

      req.user = decoded; // Attach decoded user info to the request
      next();  // Call the next middleware in the stack
    });
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Function to refresh JWT token
export const refreshToken = (token, newExpiresIn = '1h') => {
  try {
    const decoded = jwt.verify(token, SECRET_OR_PRIVATE_KEY, { ignoreExpiration: true });
    const newToken = generateToken({ id: decoded.userId, email: decoded.email }, newExpiresIn);
    return newToken;
  } catch (error) {
    console.error('Error refreshing JWT:', error);
    return null;
  }
};
