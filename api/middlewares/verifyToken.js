import jwt from 'jsonwebtoken'
import User from '../models/user.js'
const verifyToken = async (req, res, next) => {

    const header = req.headers.authorization;

    if (!header) {
        return res.status(400).send('Authorization headers not present');
    }

    const token = header.split(' ')[1];

    if (!token) {
        return res.status(400).send({

            message: "Cannot identify User",
        });

    }
    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
        if (error) {
            console.log('Error in verification of token')
            return res.status(400).send({

                message: 'Invalid token'
            });
        }
        req.user = await User.findById(decoded._id).select('-password');
        next();
    })

}
export default verifyToken;