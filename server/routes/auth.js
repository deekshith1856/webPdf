import express from "express";
import { handlesignin, handlesignup, handleAutoLogin } from "../controllers/auth.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();


router.post('/signin', handlesignin); //route will be used for logging in a user.
router.post("/signup", handlesignup);//route will be used for signing up a user.

router.get('/auto', verifyToken, handleAutoLogin);

router.get('/verifyUser', verifyToken, (req, res) => {
    res.status(200).send({ ok: true })
})

export default router;