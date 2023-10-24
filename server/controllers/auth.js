import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js'
export { handleAutoLogin, handlesignin, handlesignup }


const handlesignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).send('Enter all the required fields')
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).send('Email is already registered')
            throw new Error('User with this mail already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        res.status(200).send({
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });

    } catch (error) {
        console.log(error)
        next(error);
    }
}
const handlesignin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        if (!email || !password) {
            res.status(400).send('All fields required');
            throw new Error('All fields required');
        }
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).send('User with this email does not exist try signing up')
            throw new Error("User with this email does not exist")

        }
        console.log(user);
        const isValidPassword = async (password) => {
            const result = await bcrypt.compare(user.password, password);
            return result;
        }

        if (!isValidPassword(password)) {
            res.status(400).send('Incorrect password');
            throw new Error("Incorrect password")

        }
        const token = generateToken(user._id)

        res.status(200).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        })

    } catch (error) {
        console.log(error)
        next(error);
    }
}
const handleAutoLogin = async (req, res, next) => {
    try {
        res.status(200).send(req.user);
    } catch (error) {
        console.log(error)
        next(error);
    }
}
