import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js'
export { handleAutoLogin, handlesignin, handlesignup }


const handlesignup = async (req, res, next) => {
    try {
        // Check if any of the required fields (name, email, password) are missing
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            const error = new Error('Enter all the required fields')

            error.status = 401; // Set the status code for the error

            throw error;

        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            // If a user with the same email exists, send an error response

            const error = new Error('User with this mail already exists')

            error.status = 401; // Set the status code for the error

            throw error;

        }
        else {
            // Generate a salt for password hashing
        const salt = await bcrypt.genSalt(10);
            // Hash the user's password with the generated salt
        const hashedPassword = await bcrypt.hash(password, salt)
            // Create a new user in the database with the provided information
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
            // Respond with a success message and user information
        res.status(200).send({
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
        }

    } catch (error) {
        console.log(error)
        next(error);
    }
}


const handlesignin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided in the request
        if (!email || !password) {

            const error = new Error('Required both email and password')

            error.status = 401; // Set the status code for the error

            throw error;
        }
        // Check if a user with the provided email exists in the database
        const user = await User.findOne({ email })
        if (!user) {
            // If no user is found with the provided email, send an error response
            // Create an error object and throw it
            const error = new Error('User with this email does not exist try signing up')

            error.status = 401; // Set the status code for the error

            throw error;

        }
        // Function to validate the provided password
        const isValidPassword = async (password) => {
            const result = await bcrypt.compare(user.password, password);
            return result;
        }
        // Check if the provided password is correct
        if (!isValidPassword(password)) {
            const error = new Error('Incorrect password')

            error.status = 401; // Set the status code for the error

            throw error;

        }
        // If email and password are correct, generate an authentication token
        const token = generateToken(user._id)
        // Respond with a success message and user information
        res.status(200).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        })

    } catch (error) {
        // Handle errors by logging them and calling the 'next' function
        console.log(error);
        next(error);
    }
}


const handleAutoLogin = async (req, res, next) => {
    try {
        // If the request has reached this point, it indicates a successful auto-login.
        // Send a 200 OK response with the user data stored in the 'req.user' object.
        res.status(200).send(req.user);
    } catch (error) {
        // Handle any errors by logging them and passing them to the 'next' function for further processing.
        console.log(error)
        next(error);
    }
}
