import jwt from 'jsonwebtoken';

// Function to generate a JWT token
const generateToken = (_id) => {
    try {
        // Create a JWT token with the user's _id as the payload, using the SECRET_KEY from environment variables
        // The token is set to expire in 7 days (you can adjust this as needed)
        return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '7d' });
    } catch (error) {
        // Handle any errors that occur during token generation
        console.log(error);
        throw new Error('Error in generating token');
    }
};

// Export the generateToken function for use in your application
export default generateToken;
