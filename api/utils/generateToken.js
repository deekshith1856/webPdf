import jwt from 'jsonwebtoken'

const generateToken = (_id) => {
    try {
        return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '7d' })

    } catch (error) {
        console.log(error);
        throw new Error('Error in generating token')

    }
}
export default generateToken;