import express from "express";
import { handlesignin, handlesignup, handleAutoLogin } from "../controllers/auth.js";
import verifyToken from "../middlewares/verifyToken.js";

// Create an Express Router
const router = express.Router();

// Route for user sign-in
router.post('/signin', handlesignin);
// This route will be used for logging in a user.
// It uses the handlesignin controller function for handling the request.

// Route for user sign-up
router.post("/signup", handlesignup);
// This route will be used for signing up a user.
// It uses the handlesignup controller function for handling the request.

// Route for auto-login with token verification
router.get('/auto', verifyToken, handleAutoLogin);
// This route is used for auto-login with token verification.
// It first verifies the token using the verifyToken middleware
// and then uses the handleAutoLogin controller function.

// Route to verify user (just a demonstration, you can customize it)
router.get('/verifyUser', verifyToken, (req, res) => {
    res.status(200).send({ ok: true });
});
// This route is just a demonstration. It verifies the user using the verifyToken middleware.
// You can customize it to perform specific user verification tasks.

// Export the router for use in your application
export default router;
